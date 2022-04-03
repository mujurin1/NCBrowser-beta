import { Button } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DemoLive } from "./DemoLive";

export interface DemoLiveConnectProps {
  demoLive: DemoLive;
}

export function DemoLiveConnect(props: DemoLiveConnectProps) {
  const { demoLive } = props;

  const [state, setState] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const autoComment = useCallback(() => {
    if (timer == null) {
      setTimer(setInterval(() => demoLive.newComments(1), 500));
    } else {
      clearInterval(timer);
      setTimer(undefined);
    }
  }, [demoLive, timer]);

  return (
    <>
      <div>デモライブ 接続ビュー {Math.random()}</div>
      <div>state: {state}</div>
      <Button onClick={() => setState((s) => s + 1)} variant="contained">
        インクリメント
      </Button>
      <Button onClick={autoComment} variant="contained">
        自動コメント追加
      </Button>
      <Button
        onClick={async () => {
          await new Promise((resolve) => resolve({}));
          demoLive.newComments(1);
        }}
        variant="contained"
      >
        コメント追加
      </Button>
    </>
  );
}
