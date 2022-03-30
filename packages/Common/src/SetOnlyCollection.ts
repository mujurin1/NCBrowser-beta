import { ReadonlyCollection } from "./ReadonlyCollection";
import { Fn } from "./util";

/**
 * 追加のみできるコレクション\
 * Value(V)の中には`string`のキーを持ったプロパティが必要
 */
export class SetOnlyCollection<V> implements ReadonlyCollection<V> {
  /** Valueのキーのプロパティ名 */
  readonly #keyName: string;
  readonly #array: any[];
  /**
   * Record<Key, Index>
   */
  readonly #record: Record<string, number>;

  /** 要素数 */
  public get length(): number {
    return this.#array.length;
  }

  /**
   * コンストラクタ
   * @param keyName `V`に存在するキープロパティ名
   */
  constructor(keyName: string) {
    this.#keyName = keyName;
    this.#array = [];
    this.#record = {};
  }

  at(index: number): V | undefined {
    return this.#array.at(index);
  }

  get(key: string): V | undefined {
    const index = this.#record[key];
    return this.#array[index];
  }

  /**
   * 新しい要素をセットする\
   * すでにある要素は上書きする
   * @param value 値
   */
  set(value: V) {
    const anyValue = value as any;
    const key = anyValue[this.#keyName];
    const index = this.#record[key];
    if (index == null) {
      this.#array.push(value);
      this.#record[key] = this.#array.length;
    } else {
      this.#array[index] = value;
    }
  }

  filter(fn: Fn<[V], boolean>): SetOnlyCollection<V> {
    const collection = new SetOnlyCollection<V>(this.#keyName);
    for (const [_, value] of this) {
      if (fn(value)) collection.set(value);
    }

    return collection;
  }

  find(fn: Fn<[V], boolean>): V | undefined {
    for (const [_, value] of this) {
      if (fn(value)) return value;
    }
  }

  *[Symbol.iterator](): Iterator<readonly [string, V], any, undefined> {
    for (const value of this.#array) {
      const key = value[this.#keyName];
      yield [key, value];
    }
  }
}
