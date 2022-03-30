import { localStorageModel } from "../model/localStrageModel";
import { ChatStore } from "./live/ChatStore";
import { LiveNotify } from "./live/LiveNotify";
import { LiveStore } from "./live/LiveStore";
import { LiveViewStore } from "./live/LiveViewStore";
import { LocalStorage } from "./storage/LocalStorage";

export function singleton<T>(fn: () => T): () => T {
  let instance: T | null = null;
  return () => instance ?? (instance = fn());
}

export const dep: {
  storage: () => LocalStorage<localStorageModel>;
  chatStore: () => ChatStore;
  liveNotify: () => LiveNotify;
  liveStore: () => LiveStore;
  liveViewStore: () => LiveViewStore;
} = {} as any;
