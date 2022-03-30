// import { NcbUser } from "../index";

// /**
//  * 読み取り専用のユーザーコレクション
//  */
// export interface ReadonlyUserCollection extends Iterable<NcbUser> {
//   length: number;

//   get(key: string): NcbUser | undefined;

//   /**
//    * ユーザーをフィルタして新しいUserCollectionを返す
//    * @param fn 欲しいユーザーの場合に`True`を返す関数
//    * @returns ReadonlyUserCollection
//    */
//   filter(fn: (user: NcbUser) => boolean): ReadonlyUserCollection;

//   /**
//    * 最初に一致するユーザーを返す
//    * @param fn 欲しい値の時`True`を返す条件式
//    * @returns NcbUser | undefined
//    */
//   find(fn: (user: NcbUser) => boolean): NcbUser | undefined;

//   keys(): IterableIterator<string>;
//   values(): IterableIterator<NcbUser>;
// }
