import { SetOnlyTrigger, Trigger } from "@ncb/common";
import { StorageData } from "./StorageData";

/**
 * 保存されるデータ
 */
export interface LocalStorage {
  /**
   * データ
   */
  readonly data: StorageData;

  /**
   * データが更新されたら呼ばれる
   * @params [更新されたキー名]
   */
  readonly onUpdated: SetOnlyTrigger<[string]>;

  /**
   * データをストレージに上書きする
   */
  save(): Promise<void>;

  /**
   * データをストレージから読み取る\
   * `this.data`を更新する
   */
  load(): Promise<void>;
}
