/**
 * ニコ生のコメント形式
 */
export interface NiconamaComment {
  /**
   * コメントID
   * ニコ生とアプリ全体と同じ
   */
  readonly id: string;

  /**
   * コメントをしたユーザーのID\
   * (ニコ生のユーザーIDは内部と外部で同じ)
   */
  readonly commentId: string;

  /**
   * コメント番号\
   * ニコニコ公式放送等には存在しない
   */
  readonly no?: number;

  // 正確でないので使用しない
  // /**
  //  * コメント時刻\
  //  * 枠取得からの経過時刻 (vpos/100 => 秒)
  //  */
  // readonly vpos: number;

  /**
   * コメント時刻 UNIX時刻(UTC+9)
   */
  readonly date: number;

  // 使用しない
  // /**
  //  * コメント時刻\
  //  * 秒未満
  //  */
  // date_usec: number;

  /**
   * コマンド 184やカラーコード等
   */
  readonly mail?: string;

  /**
   * コメント内容\
   * ユーザーが運営・生主だと内容が特殊なことがある\
   * (/info HTML形式 など)
   */
  readonly content: string;

  /**
   * 自分自身のコメントか
   */
  readonly yourPost: boolean;
}
