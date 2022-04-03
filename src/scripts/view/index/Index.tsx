import { LiveError } from "@ncb/ncbrowser-definition";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { dep } from "../../service/dep";
import { VirtualListLayoutManager } from "../components/VirtualList/VirtualListLayoutManager";
import { CommentView } from "./CommentView";
import { Connection } from "./Connection";
import { SendComment } from "./SendComment";

export interface IndexProps {}

export function IndexComponent(props: IndexProps) {
  const liveManager = dep.getChatNotify();
  const [errors, setErrors] = useState<LiveError[]>([]);
  const [viewSize, setViewSize] = useState({ widht: 800, height: 500 });

  const chatStore = dep.getChatStore();

  useEffect(() => {
    const fn = (error: LiveError) => setErrors([...errors, error]);
    liveManager.onError.add(fn);
    return () => liveManager.onError.delete(fn);
  }, [liveManager, errors]);

  const layoutManager = useMemo(
    () => new VirtualListLayoutManager(20, chatStore.comments.length),
    []
  );

  const resize = useCallback(
    (e: Event, height: number | number[]) => {
      if (typeof height === "number") {
        setViewSize((size) => ({ ...size, height }));
        layoutManager.setViewportHeight(height);
      }
    },
    [layoutManager]
  );

  return (
    <div>
      <div
        style={{
          backgroundColor: "cyan",
          width: "100%",
          height: "60px",
        }}
      >
        ヘッダービュー
        <br />
        {`${errors.at(-1)?.livePlatformId}\n${errors.at(-1)?.errorMessage}`}
      </div>
      <div
        style={{
          backgroundColor: "salmon",
          width: "100%",
          height: "100px",
        }}
      >
        <Connection />
      </div>
      <div
        style={{
          backgroundColor: "chocolate",
          width: "100%",
          height: "500px",
        }}
      >
        <CommentView
          height={viewSize.height}
          width={viewSize.widht}
          layoutManager={layoutManager}
        />
      </div>
      <div
        style={{
          backgroundColor: "orange",
          width: "100%",
          height: "100px",
        }}
      >
        <SendComment />
      </div>
    </div>
  );
}
