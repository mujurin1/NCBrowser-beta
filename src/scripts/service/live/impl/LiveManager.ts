import { Trigger } from "@ncb/common";
import {
  LiveState,
  UpdateVariation,
  NcbComment,
  NcbUser,
} from "@ncb/ncbrowser-definition";
import { Live, LiveError } from "@ncb/ncbrowser-definition";
import { ChatStore } from "../ChatStore";
import { LiveNotify } from "../LiveNotify";
import { LiveStore } from "../LiveStore";

export class LiveManager implements LiveNotify, LiveStore {
  /** 放送の配列 */
  readonly lives: Live[];
  /** 放送のマップ */
  readonly #liveMap: Record<string, Live>;

  changeState = new Trigger<[string, LiveState]>();
  changeComments = new Trigger<[string, UpdateVariation, ...NcbComment[]]>();
  changeUsers = new Trigger<[string, UpdateVariation, ...NcbUser[]]>();
  onError = new Trigger<[LiveError]>();

  public constructor(chatStore: ChatStore, lives: Live[]) {
    this.lives = [];
    this.#liveMap = {};
    lives.forEach((live) => {
      this.lives.push(live);
      this.#liveMap[live.livePlatformId] = live;
      // チャット
      live.changeUsers.add((variation, ...users) => {
        chatStore.changeUsers(variation, ...users);
        this.changeUsers.fire(live.livePlatformId, variation, ...users);
      });
      live.changeComments.add((variation, ...comments) => {
        chatStore.changeComments(variation, ...comments);
        this.changeComments.fire(live.livePlatformId, variation, ...comments);
      });
      // エラー
      live.onError.add((error) => this.onError.fire(error));
    });
  }

  getLive(livePlatformId: string): Live {
    return this.#liveMap[livePlatformId];
  }
}
