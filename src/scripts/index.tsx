import {
  checkTokenRefresh,
  GetNicoTokenUrl,
  setNicoApiUseToken,
} from "@ncb/niconama-api";
import React from "react";
import ReactDOM from "react-dom";
import { NiconamaLive } from "./livePlatform/niconama/NiconamaLive";
import { DemoLive } from "./livePlatform/__demo__/DemoLive";
import { dep, singleton } from "./service/dep";
import { ChatStore } from "./service/live/ChatStore";
import { ChatStoreImpl } from "./service/live/impl/ChatStoreImpl";
import { LiveManager } from "./service/live/impl/LiveManager";
import { ChromeLocalStorage } from "./service/storage/impl/ChromeLocalStorage";
import { LocalStorage } from "./service/storage/LocalStorage";
import { IndexComponent } from "./view/index/Index";

// ======================= サービスの初期化 =======================
// TODO: 後で整理する
function init() {
  const chatStore = new ChatStoreImpl();
  const chromeStorage = new ChromeLocalStorage();
  chromeStorage.load().then(async () => {
    setNicoApiUseToken(() => {
      const token = chromeStorage.data.nico.token?.access_token;
      if (token == null) throw new Error("トークンが存在しません");
      return token;
    });
    if (chromeStorage.data.nico?.token?.access_token == null) {
      window.open(GetNicoTokenUrl, "get_nico_oauth");
    } else {
      chromeStorage.data.nico.token = await checkTokenRefresh(
        chromeStorage.data.nico.token
      );
      await chromeStorage.save();
    }
  });

  const demoLive = new DemoLive();
  const niconama = new NiconamaLive();
  const liveManager = singleton(
    () => new LiveManager(chatStore, [demoLive, niconama])
  );

  dep.getStorage = singleton<LocalStorage>(() => chromeStorage);
  dep.getChatStore = singleton<ChatStore>(() => chatStore);
  dep.getChatNotify = liveManager;
  dep.getLiveStore = liveManager;
}

init();

ReactDOM.render(
  <React.StrictMode>
    <IndexComponent />
  </React.StrictMode>,
  document.getElementById("root")
);
