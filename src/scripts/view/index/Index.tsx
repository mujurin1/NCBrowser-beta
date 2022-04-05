import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import { LiveError } from "@ncb/ncbrowser-definition";
import React, { useEffect, useMemo, useState } from "react";
import { dep } from "../../service/dep";
import { Dialog } from "../components/Dialog/Dialog";
import { VirtualListLayoutManager } from "../components/VirtualList/VirtualListLayoutManager";
import { CommentView } from "./CommentView";
import { Connection } from "./Connection";
import { SendComment } from "./SendComment";

export function IndexComponent() {
  const liveStore = dep.getLiveStore();
  const [errors, setErrors] = useState<LiveError[]>([]);

  useEffect(() => {
    const fn = (error: LiveError) => setErrors([...errors, error]);
    liveStore.onError.add(fn);
    return () => liveStore.onError.delete(fn);
  }, [liveStore, errors]);

  const layoutManager = useMemo(() => new VirtualListLayoutManager(20, 0), []);

  const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false);

  return (
    <div
      css={css`
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      `}
    >
      <div
        css={css`
          background: cyan;
          flex: 0 0 60px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
        `}
      >
        <div>
          ヘッダービュー
          <br />
          {`${errors.at(-1)?.livePlatformId ?? "(undefined)"}\n${
            errors.at(-1)?.errorMessage ?? "(undefined)"
          }`}
        </div>
        <Button
          onClick={() => setIsConnectionDialogOpen(true)}
          variant="contained"
        >
          接続
        </Button>
      </div>
      <div
        style={{
          backgroundColor: "chocolate",
          width: "100%",
          flex: "1 1 0",
        }}
      >
        <CommentView layoutManager={layoutManager} />
      </div>
      <div
        css={css`
          background-color: orange;
          width: 100%;
          flex: 0 0 100px;
        `}
      >
        <SendComment />
      </div>
      <Dialog
        open={isConnectionDialogOpen}
        onClose={() => setIsConnectionDialogOpen(false)}
      >
        <Connection />
      </Dialog>
    </div>
  );
}
