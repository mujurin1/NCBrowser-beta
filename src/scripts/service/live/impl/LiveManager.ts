import { Trigger } from "@ncb/common";
import {
  LiveState,
  UpdateVariation,
  NcbComment,
  NcbUser,
  LiveViews,
} from "@ncb/ncbrowser-definition";
import { Live } from "@ncb/ncbrowser-definition";
import { LiveNotify } from "../LiveNotify";
import { LiveStore } from "../LiveStore";
import { LiveViewStore } from "../LiveViewStore";

export class LiveManager implements LiveNotify, LiveStore, LiveViewStore {
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

  public changeState = this.#changeState;
  public changeComments = this.#changeComments;
  public changeUsers = this.#changeUsers;

  readonly lives: ReadonlyArray<Live>;

  public constructor(lives: Live[]) {
    this.#lives = [];
    this.#liveMap = {};
    lives.forEach((live) => {
      this.#lives.push(live);
      this.#liveMap[live.livePlatformId] = live;
    });
    this.lives = this.#lives;
  }

  public getLive(livePlatformId: string): Live {
    return this.#liveMap[livePlatformId];
  }

  public getViewAll(): LiveViews[] {
    return this.#lives.map((live) => live.views);
  }
}
