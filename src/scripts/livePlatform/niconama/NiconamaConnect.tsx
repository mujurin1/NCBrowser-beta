import { Button, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { NiconamaLive } from "./NiconamaLive";

export interface NiconamaConnectProps {
  niconama: NiconamaLive;
}

export function NiconamaConnect(props: NiconamaConnectProps) {
  const { niconama } = props;
  const [liveId, setLiveId] = useState("lv336372619");

  const changeLiveId = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setLiveId(e.target.value);
    },
    []
  );

  const connectLive = useCallback(() => {
    void niconama.connectLive(31103661, liveId);
  }, [niconama, liveId]);
  const disconnectLive = useCallback(() => {
    void niconama.disconnectLive();
  }, [niconama]);

  return (
    <>
      <TextField
        onChange={changeLiveId}
        label="放送ID"
        defaultValue={liveId}
        size="small"
      />
      <Button onClick={connectLive} variant="contained">
        接続
      </Button>
      <Button onClick={disconnectLive} variant="contained">
        切断
      </Button>
    </>
  );
}
