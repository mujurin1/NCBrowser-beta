import { LiveViews } from "@ncb/ncbrowser-definition";

/**
 * 複数の放送のビューを提供する
 */
export interface LiveViewStore {
  /**
   * 放送のビューを取得する
   */
  getViewAll(): LiveViews[];
}
