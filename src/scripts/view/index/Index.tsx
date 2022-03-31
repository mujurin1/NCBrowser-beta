import React, { useCallback, useMemo, useState } from "react";
import { dep } from "../../service/dep";
import { VirtualListLayoutManager } from "../components/VirtualList/VirtualListLayoutManager";
import { CommentView } from "./CommentView";
import { Connection } from "./Connection";

export interface IndexProps {}

export function IndexComponent(props: IndexProps) {
  const [viewSize, setViewSize] = useState({ widht: 800, height: 500 });

  const chatStore = dep.chatStore();

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
        <CommentView height={500} width={800} layoutManager={layoutManager} />
      </div>
      <div
        style={{
          backgroundColor: "orange",
          width: "100%",
          height: "60px",
        }}
      >
        コメント送信ビュー
      </div>
    </div>
  );
}
