import React from "react";
import { DemoLivePlatform } from "./DemoLivePlatform";

export interface DemoLiveSendCommentProps {
  demoLive: DemoLivePlatform;
}

export function DemoLiveSendComment(props: DemoLiveSendCommentProps) {
  return (
    <>
      <div>デモライブ コメント送信ビュー</div>
    </>
  );
}
