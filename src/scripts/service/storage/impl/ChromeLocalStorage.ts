import { Trigger } from "@ncb/common";
import { LocalStorage } from "../LocalStorage";
import { initialStorageData } from "../StorageData";

export class ChromeLocalStorage implements LocalStorage {
  data = initialStorageData;
  readonly onUpdated = new Trigger();

  constructor() {
    chrome.storage.onChanged.addListener(async (changes, areaname) => {
      if (areaname === "local") {
        await this.load();
        this.onUpdated.fire();
      }
    });
  }

  async save() {
    chrome.storage.local.set({ ...this.data });
  }

  async load() {
    this.data = {
      ...initialStorageData,
      ...(await chrome.storage.local.get(undefined)),
    };
  }
}
