import { getNiconamaToken, NicoTokenResultUrl } from "@ncb/niconama-api";
import { ChromeLocalStorage } from "./service/storage/impl/ChromeLocalStorage";

const chromeStorage = new ChromeLocalStorage();
void chromeStorage.load().then(async () => {
  /*
   * ニコ生OAuthトークンを再設定する\
   * https://github.com/niconamaworkshop/websocket_api_document/blob/master/pdf/NOAUTH-Tokenendpoint.pdf
   */
  const token_reset_pathnames = ["/oauthCallback"];
  if (
    location.href.indexOf(NicoTokenResultUrl) === 0 &&
    token_reset_pathnames.indexOf(location.pathname) >= 0
  ) {
    const [token, idToken] = getNiconamaToken();
    // ローカルに保存する
    chromeStorage.data.nico = { token, idToken };
    await chromeStorage.save();
  }
});
