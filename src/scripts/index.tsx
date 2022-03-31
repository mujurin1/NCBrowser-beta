import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { DemoLivePlatform as DemoLivePlatform } from "./livePlatform/__demo__/DemoLivePlatform";
import { dep, singleton } from "./service/dep";
import { ChatStore } from "./service/live/ChatStore";
import { ChatStoreImpl } from "./service/live/impl/ChatStoreImpl";
import { LiveManager } from "./service/live/impl/LiveManager";
import { LocalStorage, EmptyStorage } from "./service/storage/LocalStorage";
import { IndexComponent } from "./view/index/Index";

// サービスの初期化
const chatStore = new ChatStoreImpl();

const demoLive = new DemoLivePlatform();
const demoLive2 = new DemoLivePlatform();
const liveManager = singleton(
  () => new LiveManager(chatStore, [demoLive, demoLive2])
);

dep.storage = singleton<LocalStorage<{}>>(() => new EmptyStorage({}));
dep.chatStore = singleton<ChatStore>(() => chatStore);
dep.chatNotify = liveManager;
dep.liveStore = liveManager;

ReactDOM.render(
  <React.StrictMode>
    <IndexComponent />
  </React.StrictMode>,
  document.getElementById("root")
);
