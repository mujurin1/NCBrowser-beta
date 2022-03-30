import React from "react";
import ReactDOM from "react-dom";
import { DemoLivePlatform } from "./live/__demo__/DemoLivePlatform";
import { dep, singleton } from "./service/dep";
import { ChatStore } from "./service/live/ChatStore";
import { ChatStoreImpl } from "./service/live/impl/ChatStoreImpl";
import { LiveManager } from "./service/live/impl/LiveManager";
import { LocalStorage, EmptyStorage } from "./service/storage/LocalStorage";

// サービスのセット
const demoLive = new DemoLivePlatform();
const liveManager = new LiveManager([demoLive]);

dep.storage = singleton<LocalStorage<{}>>(() => new EmptyStorage({}));
dep.chatStore = singleton<ChatStore>(() => new ChatStoreImpl());
dep.liveNotify = () => liveManager;
dep.liveStore = () => liveManager;
dep.liveViewStore = () => liveManager;

function IndexComponent() {
  const viewStore = dep.liveViewStore();

  const { connect, sendComment } = viewStore.getViewAll()[0];

  return (
    <>
      {connect()}
      {sendComment()}
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <IndexComponent />
  </React.StrictMode>,
  document.getElementById("root")
);
