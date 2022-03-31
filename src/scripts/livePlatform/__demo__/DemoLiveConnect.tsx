import { Button } from "@mui/material";
import React, { useState } from "react";
import { DemoLivePlatform } from "./DemoLivePlatform";

export interface DemoLiveConnectProps {
  demoLive: DemoLivePlatform;
}

export function DemoLiveConnect(props: DemoLiveConnectProps) {
  const { demoLive } = props;

  let auto = false;
  setInterval(() => {
    if (auto) demoLive.newComments(1);
  }, 500);

  const [state, setState] = useState(0);

  return (
    <>
      <div>デモライブ 接続ビュー {Math.random()}</div>
      <div>state: {state}</div>
      <Button onClick={() => setState((s) => s + 1)} variant="contained">
        インクリメント
      </Button>
      <Button onClick={() => (auto = !auto)} variant="contained">
        自動コメント追加
      </Button>
    </>
  );
}
