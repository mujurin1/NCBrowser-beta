import { Trigger } from "@ncb/common";
import {
  LiveState,
  UpdateVariation,
  NcbComment,
  NcbUser,
} from "@ncb/ncbrowser-definition";
import { Live } from "@ncb/ncbrowser-definition";
import { ChatStore } from "../ChatStore";
import { LiveNotify } from "../LiveNotify";
import { LiveStore } from "../LiveStore";

export class LiveManager implements LiveNotify, LiveStore {
  /** 放送の配列 */
  readonly #lives: Live[];
  /** 放送のマップ */
  readonly #liveMap: Record<string, Live>;

  readonly #changeState = new Trigger<[string, LiveState]>();
  readonly #changeComments = new Trigger<
    [string, UpdateVariation, ...NcbComment[]]
  >();
  readonly #changeUsers = new Trigger<
    [string, UpdateVariation, ...NcbUser[]]
  >();

  changeState = this.#changeState;
  changeComments = this.#changeComments;
  changeUsers = this.#changeUsers;

  readonly lives: ReadonlyArray<Live>;

  public constructor(chatStore: ChatStore, lives: Live[]) {
    this.#lives = [];
    this.#liveMap = {};
    lives.forEach((live) => {
      this.#lives.push(live);
      this.#liveMap[live.livePlatformId] = live;
      // チャット
      live.changeUsers.add((variation, ...users) => {
        console.log("user update");
        chatStore.changeUsers(variation, ...users);
        this.#changeUsers.fire(live.livePlatformId, variation, ...users);
      });
      live.changeComments.add((variation, ...comments) => {
        console.log("comment update");
        chatStore.changeComments(variation, ...comments);
        this.#changeComments.fire(live.livePlatformId, variation, ...comments);
      });
    });

    this.lives = this.#lives;
  }

  getLive(livePlatformId: string): Live {
    return this.#liveMap[livePlatformId];
  }
}
