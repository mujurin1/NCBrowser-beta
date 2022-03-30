import { Button } from "@mui/material";
import React, { useState } from "react";

export function DemoLiveConnect() {
  const [state, setState] = useState(0);

  return (
    <>
      <div>デモライブ 接続ビュー</div>
      <div>state: {state}</div>
      <Button onClick={() => setState((s) => s + 1)}>インクリメント</Button>
    </>
  );
}
