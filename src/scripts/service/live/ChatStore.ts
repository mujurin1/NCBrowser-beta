import { ReadonlyCollection } from "@ncb/common";
import {
  UpdateVariation,
  NcbComment,
  NcbUser,
} from "@ncb/ncbrowser-definition";

/**
 * チャットを保持・提供する
 */
export interface ChatStore {
  /**
   * コメントのコレクション
   */
  readonly comments: ReadonlyCollection<NcbComment>;
  /**
   * ユーザーのコレクション
   */
  readonly users: ReadonlyCollection<NcbUser>;

  /**
   * コメントを変更する
   * @param valiation 変更の種類
   * @param comments 変更するコメント配列
   */
  changeComments(valiation: UpdateVariation, ...comments: NcbComment[]): void;

  /**
   * ユーザーを変更する
   * @param valiation 変更の種類
   * @param comments 変更するユーザー配列
   */
  changeUsers(valiation: UpdateVariation, ...users: NcbUser[]): void;
}
