import { NiconamaIdToken, NiconamaTokenData } from "@ncb/niconama-api";

/**
 * LoalStorageの初期値
 */
export const initialStorageData: StorageData = {
  nico: {},
};

/**
 * LocalStorageのデータ
 */
export interface StorageData {
  /** ニコニコ生放送 */
  nico: {
    /** ニコニコのOAuth情報 */
    token?: NiconamaTokenData;
    /** ログインしているユーザーの情報やAPI Token情報 */
    idToken?: NiconamaIdToken;
  };
}
