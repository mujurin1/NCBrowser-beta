import { SetOnlyTrigger, Trigger } from "@ncb/common";

/**
 * 拡張機能のローカルに保存されるストレージ
 */
export interface LocalStorage<T> {
  /**
   * データ
   */
  readonly data: T;

  /**
   * データが更新されたら呼ばれる
   * @params [更新されたキー名]
   */
  readonly onUpdated: SetOnlyTrigger<[string]>;

  /**
   * データを上書きする
   * @param data 新しいデータ
   */
  set(data: T): Promise<void>;
}

export class EmptyStorage<T> implements LocalStorage<T> {
  #onUpdated = new Trigger<[string]>();

  public readonly data: T;
  public readonly onUpdated: SetOnlyTrigger<[string]> =
    this.#onUpdated.asSetOnlyTrigger();

  constructor(data: T) {
    this.data = data;
  }

  set(data: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
