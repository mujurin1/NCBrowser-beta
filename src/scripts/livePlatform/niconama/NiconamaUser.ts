/**
 * ニコ生のユーザー形式
 */
export interface NiconamaUser {
  /**
   * アプリ全体でのユーザーID
   */
  readonly globalId: string;

  /**
   * ニコ生のユーザーID\
   * 生IDは数字。184は英数字列
   */
  readonly niconamaId: string;

  /**
   * ユーザー名（コテハン）
   */
  readonly name: string;

  /**
   * ユーザーアイコンURL\
   * 184は存在しない
   */
  readonly userIconUrl?: string;

  /**
   * 184ユーザーならTrue
   */
  readonly anonymity: boolean;

  /**
   * プレ垢か
   */
  readonly premium: boolean;

  /**
   * 生主・運営コメント\
   * エモーション、システムコメント
   */
  readonly operation: boolean;
}
