import {
  getNiconamaToken,
  GetNicoTokenUrl,
  NicoTokenResultUrl,
} from "@ncb/niconama-api";
import { NiconamaLive } from "./livePlatform/niconama/NiconamaLive";
import { DemoLive } from "./livePlatform/__demo__/DemoLive";
import { dep, singleton } from "./service/dep";
import { ChatStore } from "./service/live/ChatStore";
import { ChatStoreImpl } from "./service/live/impl/ChatStoreImpl";
import { LiveManager } from "./service/live/impl/LiveManager";
import { ChromeLocalStorage } from "./service/storage/impl/ChromeLocalStorage";
import { LocalStorage } from "./service/storage/LocalStorage";

const chatStore = new ChatStoreImpl();
const chromeStorage = new ChromeLocalStorage();
chromeStorage.load().then(async () => {
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
