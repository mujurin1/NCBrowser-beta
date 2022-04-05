import { assertNotNullish, Trigger } from "@ncb/common";
import {
  Live,
  LiveState,
  UpdateVariation,
  NcbComment,
  NcbUser,
  LiveViews,
} from "@ncb/ncbrowser-definition";
import { LiveError } from "@ncb/ncbrowser-definition";
import {
  NiconamaCommentWs,
  NiconamaCommentRoom,
  NiconamaGetUnamaProgramsRooms,
  NiconamaChat,
  setNiconamaApiUseToken,
  GetNicoTokenUrl,
  checkTokenRefresh,
} from "@ncb/niconama-api";
import { nanoid } from "nanoid";
import { dep } from "../../service/dep";
import { NiconamaComment } from "./NiconamaComment";
import { NiconamaConnect } from "./NiconamaConnect";
import { NiconamaSendComment } from "./NiconamaSendComment";
import { NiconamaUser } from "./NiconamaUser";

export class NiconamaLive implements Live {
  /** ニコ生ユーザー情報 */
  #users: Record<string, NiconamaUser> = {};
  /** ニコ生コメント情報 */
  #comments: Record<string, NiconamaComment> = {};
  /** ニコ生コメント取得用ウェブソケット */
  #niconamaCommentWs?: NiconamaCommentWs;
  /** コメントの部屋 */
  #rooms: NiconamaCommentRoom[] = [];

  readonly views: LiveViews;

  /** 接続しているか */
  get connecting(): boolean {
    return this.#niconamaCommentWs?.readyState === 1;
  }
  liveState?: LiveState;

  public static readonly id = "Niconama";
  public static readonly platformName = "ニコ生";
  readonly livePlatformId = NiconamaLive.id;
  readonly livePlatformName = NiconamaLive.platformName;

  readonly updateLiveState = new Trigger<[LiveState]>();
  readonly changeComments = new Trigger<[UpdateVariation, ...NcbComment[]]>();
  readonly changeUsers = new Trigger<[UpdateVariation, ...NcbUser[]]>();
  readonly onError = new Trigger<[LiveError]>();

  public constructor() {
    this.views = {
      sendComment: () => NiconamaSendComment({ niconama: this }),
      connect: () => NiconamaConnect({ niconama: this }),
    };

    this.initNiconamaApi();
  }

  private initNiconamaApi() {
    const storage = dep.getStorage();
    // トークン取得ラムダ
    setNiconamaApiUseToken(() => {
      const token = storage.data.nico.token?.access_token;
      if (token == null) throw new Error("トークンが存在しません");
      return token;
    });
    // トークン有効性のチェック
    void storage.load().then(() => {
      if (storage.data.nico?.token?.access_token == null) {
        window.open(GetNicoTokenUrl, "get_nico_oauth");
      } else {
        void checkTokenRefresh(storage.data.nico.token).then(async (token) => {
          storage.data.nico.token = token;
          await storage.save();
        });
      }
    });
  }

  /**
   * 放送に接続する
   * @param useId 視聴者(トークン主の)のニコニコユーザーID
   * @param liveId 放送ID
   * @returns 接続に成功したら`undefined`失敗したら`NiconamaApiResponseMeta`
   */
  public async connectLive(useId: number, liveId: string): Promise<void> {
    if (this.#niconamaCommentWs != null) return;
    const { meta, data } = await NiconamaGetUnamaProgramsRooms({
      query: {
        userId: useId,
        nicoliveProgramId: liveId,
      },
    });
    if (meta.status !== 200) {
      this.onError.fire({
        livePlatformId: this.livePlatformId,
        errorMessage:
          meta.errorMessage ?? `${meta.status}:放送IDまたはトークンが不正です`,
      });
      return;
    }
    // assertNiconamaResponse("NiconamaLivePlatform.connectLive", { meta, data });
    assertNotNullish(data);
    this.#rooms = data;

    this.#niconamaCommentWs = new NiconamaCommentWs(this.#rooms[0]);
    this.#niconamaCommentWs.onOpenCall = this.onOpen.bind(this);
    this.#niconamaCommentWs.onReceiveChat = this.receiveChat.bind(this);
    this.#niconamaCommentWs.onCloseCall = this.onClose.bind(this);
    return;
  }

  /**
   * 放送から切断する
   */
  public disconnectLive() {
    if (this.#niconamaCommentWs == null) return;
    this.#niconamaCommentWs.disconnect();
  }

  /**
   * ニコ生コメント用ウェブソケットが開通したら呼ばれる
   */
  private onOpen() {
    assertNotNullish(this.#niconamaCommentWs);
    this.#niconamaCommentWs.connectLive(100);
  }

  /**
   * ニコ生コメント用ウェブソケットが閉じたら呼ばれる
   */
  private onClose() {
    this.#niconamaCommentWs = undefined;
  }

  /**
   * チャット受信
   * @params chats ニコ生コメント配列
   */
  private receiveChat(...chats: NiconamaChat[]) {
    console.log("receiveChat", chats);

    // 新規コメント・新規ユーザー
    const comments: NcbComment[] = [];
    const users: NcbUser[] = [];
    for (const chat of chats) {
      const comment = niconamaChatToComment(chat);
      this.#comments[comment.commentId] = comment;
      let user = this.#users[comment.commentId];
      if (user == null) {
        user = createUser(comment, chat);
        this.#users[user.globalId] = user;
        users.push(toNcbUser(user));
      }
      comments.push(toNcbComment(comment, user));
    }
    if (users.length > 0) this.changeUsers.fire("Add", ...users);
    this.changeComments.fire("Add", ...comments);
  }
}

function toNcbComment(
  comment: NiconamaComment,
  user: NiconamaUser
): NcbComment {
  return {
    globalId: comment.id,
    userGlobalId: user.globalId,
    content: {
      text: comment.content,
      time: comment.date,
    },
    livePlatformId: NiconamaLive.id,
  };
}

function toNcbUser(user: NiconamaUser): NcbUser {
  return {
    globalId: user.globalId,
    livePlatformId: NiconamaLive.id,
    status: {
      name: user.name,
      userIconUrl: user.userIconUrl,
    },
  };
}

function niconamaChatToComment(chat: NiconamaChat): NiconamaComment {
  return {
    id: nanoid(),
    date: chat.date,
    content: chat.content,
    commentId: chat.user_id,
    no: chat.no,
    mail: chat.mail,
    yourPost: chat.yourpost === 1,
  };
}

function createUser(
  comment: NiconamaComment,
  chat: NiconamaChat
): NiconamaUser {
  return {
    globalId: nanoid(),
    niconamaId: comment.commentId,
    name: comment.commentId,
    userIconUrl: undefined,
    anonymity: chat.anonymity === 1,
    premium: chat.premium === 1,
    operation: chat.premium === 3,
  };
}
