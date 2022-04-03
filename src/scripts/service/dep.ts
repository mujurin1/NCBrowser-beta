import { ChatStore } from "./live/ChatStore";
import { LiveNotify } from "./live/LiveNotify";
import { LiveStore } from "./live/LiveStore";
import { LocalStorage } from "./storage/LocalStorage";

export function singleton<T>(fn: () => T): () => T {
  let instance: T | null = null;
  return () => instance ?? (instance = fn());
}

/** サービスの管理者 */
export const dep: {
  getStorage: () => LocalStorage;
  getChatStore: () => ChatStore;
  getChatNotify: () => LiveNotify;
  getLiveStore: () => LiveStore;
} = {} as any;
