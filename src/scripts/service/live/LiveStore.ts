import { SetOnlyTrigger } from "@ncb/common";
import { Live, LiveError } from "@ncb/ncbrowser-definition";

/**
 * 放送を提供する
 */
export interface LiveStore {
  /**
   * 放送の配列
   */
  readonly lives: ReadonlyArray<Live>;

  /**
   * Liveでエラーが起こった
   */
  readonly onError: SetOnlyTrigger<[LiveError]>;

  /**
   * 放送を取得する
   * @param livePlatformId 配信プラットフォームID
   */
  getLive(livePlatformId: string): Live;
}
