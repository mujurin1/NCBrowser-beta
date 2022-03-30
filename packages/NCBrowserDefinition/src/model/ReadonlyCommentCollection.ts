// import { NcbComment } from "../index";

// /**
//  * 読み取り専用のコメントコレクション
//  */
// export interface ReadonlyCommentCollection extends Iterable<NcbComment> {
//   length: number;

//   at(index: number): NcbComment | undefined;

//   get(key: string): NcbComment | undefined;

//   /**
//    * コメントをフィルタして新しいCommentCollectionを返す
//    * @param fn 欲しいコメントの場合に`True`を返す関数
//    * @returns ReadonlyCommentCollection
//    */
//   filter(fn: (comment: NcbComment) => boolean): ReadonlyCommentCollection;

//   /**
//    * 最初に一致するコメントを返す
//    * @param fn 欲しい値の時`True`を返す条件式
//    * @returns NcbComment | undefined
//    */
//   find(fn: (comment: NcbComment) => boolean): NcbComment | undefined;
// }
