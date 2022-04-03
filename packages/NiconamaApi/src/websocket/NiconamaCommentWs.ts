import {
  NiconamaCommentRoom,
  NiconamaChat,
  NiconamaCommentPing,
  NiconamaCommentReceiveThread,
  NiconamaCommentWsReceiveMessage,
  NiconamaCommentWsSendMessage,
  NiconamaCommentThreadVersion,
} from "../index";

/**
 * ニコ生コメントを取得するためのクラス\
 * [資料PDF](https://niconama-workshop.slack.com/files/UBT6MQUJJ/F01M3711DLN/cached_message_server.pdf)
 * > また、適宜サーバの再起動が行われます\
 * > その際断りなくWebSocketの切断が行われます
 */
export class NiconamaCommentWs {
  /** ライブ接続時コメント取得完了メッセージ */
  static readonly #liveConnectedPingContent: string = "Live";
  /** 過去コメ取得完了 */
  static readonly #tsCommentPingContent: string = "Ts";

  /**
   * 接続中のWebSocket
   */
  #ws: WebSocket;
  /**
   * コメント取得状態
   * * realtime: リアルタイムにコメントを受信している
   * * ts: タイムシフト. コメントを受信することはありません
   * * getPastComments: 過去コメを纏めて取得中
   * * none: コメントを受信していません
   */
  #receiveState: "realtime" | "ts" | "getPastComments" | "none" = "none";
  /** リアルタイム接続時・過去コメ取得時用のコメントキャッシュ */
  #pastCommentCache: NiconamaChat[] = [];

  /** 部屋情報 */
  public readonly room: NiconamaCommentRoom;

  /**
   * 接続状態\
   * [`CONNECTING`,`OPEN`,`CLOSING`,`CLOSED`]
   */
  public get readyState(): number {
    return this.#ws.readyState;
  }

  /** 接続時に呼ばれる */
  public onOpenCall: () => void = () => {};
  /** エラー発生時に呼ばれる */
  public onErrorCall: () => void = () => {};
  /** 切断時に呼ばれる */
  public onCloseCall: () => void = () => {};

  /** コメント受信時に呼ばれる */
  public onReceiveChat: (...chats: NiconamaChat[]) => void = () => {};
  /** スレッド受信時に呼ばれる */
  public onReceiveThread: (thread: NiconamaCommentReceiveThread) => void =
    () => {};

  /**
   * コンストラクタ
   * @param room 接続部屋情報
   */
  public constructor(room: NiconamaCommentRoom) {
    this.room = room;
    this.#ws = new WebSocket(this.room.webSocketUri, ["msg.nicovideo.jp#json"]);
    this.#ws.onopen = this.onOpen.bind(this);
    this.#ws.onmessage = this.onMessage.bind(this);
    this.#ws.onerror = this.onError.bind(this);
    this.#ws.onclose = this.onClose.bind(this);
  }

  private onOpen(e: Event) {
    this.onOpenCall();
  }

  private onMessage(e: MessageEvent<string>) {
    const message = JSON.parse(e.data) as NiconamaCommentWsReceiveMessage;

    if ("chat" in message) {
      this.receiveChat(message.chat);
    } else if ("ping" in message) {
      this.receivePing(message.ping);
    } else if ("thread" in message) {
      // console.log("thread");
      // console.log(message.thread);
    }
  }

  private onError(e: Event) {
    this.onErrorCall();
  }

  private onClose(e: CloseEvent) {
    this.onCloseCall();
  }

  /**
   * ウェブソケットから切断します
   */
  public disconnect() {
    if (this.#ws.readyState >= 2) return;
    this.#ws.close();
  }

  /**
   * リアルタイムコメントの取得を開始します\
   * 以後新規コメントも取得できます\
   * リアルタイム接続時コメントを取得終了すると
   * `NiconamaCommentWs.#liveConnectedPing`が返ってくる
   * @param resFrom 最新順に取得するコメント件数 0 <= N <= 256
   * @param threadkey
   */
  public connectLive(resFrom: number, threadkey?: string) {
    this.#receiveState = "getPastComments";
    this.sendMessage(
      {
        thread: {
          thread: this.room.threadId,
          res_from: -resFrom,
          version: NiconamaCommentThreadVersion,
          threadkey,
        },
      },
      { ping: { content: NiconamaCommentWs.#liveConnectedPingContent } }
    );
  }

  /**
   * コメントを受信
   * @param chat ニコ生コメント
   */
  private receiveChat(chat: NiconamaChat) {
    console.log("receive chat");

    switch (this.#receiveState) {
      case "realtime":
        this.onReceiveChat(chat);
        break;
      case "getPastComments":
        this.#pastCommentCache.push(chat);
    }
  }

  /**
   * pingメッセージ受信
   * @param ping NiconamaCommentPing
   */
  private receivePing(ping: NiconamaCommentPing) {
    console.log("receive ping", ping.content);
    if (ping.content === NiconamaCommentWs.#liveConnectedPingContent) {
      // リアルタイム視聴接続時過去コメ取得完了
      this.onReceiveChat(...this.#pastCommentCache.splice(0));
      this.#receiveState = "realtime";
    } else if (ping.content === NiconamaCommentWs.#tsCommentPingContent) {
      // 過去コメ取得完了
      this.onReceiveChat(...this.#pastCommentCache.splice(0));
      this.#receiveState = "ts";
    } else {
      // ここに来るはずはない
    }
  }

  /**
   * メッセージを送信します
   * @param messages 送信するメッセージ配列
   */
  private sendMessage<T extends NiconamaCommentWsSendMessage>(
    ...messages: T[]
  ) {
    if (this.readyState !== 1) return;

    const data = `[${messages.map((x) => JSON.stringify(x))}]`;
    console.log("ニコ生コメントウェブソケット送信", data);

    this.#ws!.send(data);
  }
}
