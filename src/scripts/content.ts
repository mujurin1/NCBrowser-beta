import { getNiconamaToken, GetNicoTokenResultUrl } from "@ncb/niconama-api";
import { assert } from "@ncb/common";

/*
 * ニコ生OAuthトークンを再設定する\
 * https://github.com/niconamaworkshop/websocket_api_document/blob/master/pdf/NOAUTH-Tokenendpoint.pdf
 */
(async function () {
  const token_reset_pathnames = ["/oauthCallback", "/refresh"];
  if (
    location.href.indexOf(GetNicoTokenResultUrl) === 0 &&
    token_reset_pathnames.indexOf(location.pathname) >= 0
  ) {
    const [tokenData, openIdData] = getNiconamaToken();
    // ローカルに保存する
    // saveNicoOAuth(tokenData, openIdData);
  }
})();
