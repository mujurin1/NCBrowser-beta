import { NiconamaTokenData, NiconamaIdToken } from "./index";

/*
 * OAUTH APIを取得するためのコード
 */

const MY_SERVER = "https://us-central1-ncbrowseroauth.cloudfunctions.net";

/**
 * ニコニコのトークンリフレッシュページURL\
 * bodyに`refresh_token={リフレッシュトークン}`が必要
 */
const RefreshTokenUrl = `${MY_SERVER}/refresh`;

/**
 * ニコニコのトークンを取得するOAUTH取得ページURL
 */
export const GetNicoTokenUrl = `${MY_SERVER}/auth`;

/**
 * ニコニコのトークンを返すページのURL
 */
export const NicoTokenResultUrl = `${MY_SERVER}/oauthCallback?code=`;

/**
 * トークンをリフレッシュする
 * @param oauth チェックするトークン
 * @returns 新しいトークン
 */
export async function tokenRefresh(
  oauth: NiconamaTokenData
): Promise<NiconamaTokenData> {
  return await refreshNicoToken(oauth.refresh_token);
}

/**
 * リフレッシュトークンからトークンを再取得する
 * @param refreshToken リフレッシュトークン
 */
export async function refreshNicoToken(
  refreshToken: string
): Promise<NiconamaTokenData> {
  return await fetch(RefreshTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `refresh_token=${refreshToken}`,
  })
    .then((res) => res.text())
    .then((res) => JSON.parse(res));
}

/**
 * 現在のページからニコ生OAuthトークンを取得する
 * @throws ページにOAUTH TOKENが含まれなかった
 */
export function getNiconamaToken(): readonly [
  NiconamaTokenData,
  NiconamaIdToken
] {
  // https://github.com/niconamaworkshop/websocket_api_document/blob/master/pdf/NOAUTH-Tokenendpoint.pdf
  const tokenJson = document.getElementById("token-data")?.innerText;
  const openIdJson =
    document.getElementById("user-data")?.innerText ??
    document.getElementById("user-id")?.innerText;
  if (tokenJson == null || openIdJson == null)
    throw new Error("このページはニコ生トークンがあるページではないです");

  const token: NiconamaTokenData = JSON.parse(tokenJson);
  const idToken: NiconamaIdToken = JSON.parse(openIdJson);
  return [token, idToken] as const;
}
