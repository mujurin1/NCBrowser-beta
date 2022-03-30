/**
 * ニコニコのトークン
 */
//https://github.com/niconamaworkshop/websocket_api_document/blob/master/pdf/NOAUTH-Tokenendpoint.pdf
export interface NiconamaTokenData {
  /**
   * トークンが無効になる時刻（UNIX時間）\
   * この値はニコ生API本来の戻り値には存在しない
   */
  time: number;
  /** トークン */
  access_token: string;
  /** トークンの寿命（秒） */
  expires_in: number;
  /** リフレッシュトークン */
  refresh_token: string;
  /** スコープ */
  scope: string;
  /** ID TOKEN */
  id_token: string;
}

/**
 * ニコニコのトークンを取得したユーザー
 * （ログインしているユーザーの情報）\
 * `NiconamaTokenData.id_token`の中を展開すると得られる
 */
export interface NiconamaIdToken {
  /** OAuth Domain */
  iss: string;
  /** ニコニコユーザーID */
  sub: string;
  /** トークンの発行先クライアントID */
  aud: string[];
  /** このID Tokenの発行日時（UNIX TIME） */
  lat: number;
  /** このID Tokenの失効日時（UNIX TIME） */
  exp: number;
  /**
   * このユーザーの全開の認証日時\
   * 発行時に`max_age`が与えられた時に現れる
   */
  auth_time: number;
  /**
   * 発行時に与えたnonce\
   * ID Token発行時にリクエストで与えたnonce文字列がある時に、その内容
   */
  nonce?: string;
  at_hash?: string;
}
