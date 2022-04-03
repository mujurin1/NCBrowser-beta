import React from "react";
import { DemoLive } from "./DemoLive";

export interface DemoLiveSendCommentProps {
  demoLive: DemoLive;
}

export function DemoLiveSendComment(props: DemoLiveSendCommentProps) {
  return (
    <>
      <div>デモライブ コメント送信ビュー {Math.random()}</div>
    </>
  );
}
