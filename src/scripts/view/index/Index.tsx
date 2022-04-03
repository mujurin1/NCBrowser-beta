import { LiveError } from "@ncb/ncbrowser-definition";
import React, { useEffect, useMemo, useState } from "react";
import { dep } from "../../service/dep";
import { VirtualListLayoutManager } from "../components/VirtualList/VirtualListLayoutManager";
import { CommentView } from "./CommentView";
import { Connection } from "./Connection";
import { SendComment } from "./SendComment";

export function IndexComponent() {
  const liveManager = dep.getChatNotify();
  const [errors, setErrors] = useState<LiveError[]>([]);

  useEffect(() => {
    const fn = (error: LiveError) => setErrors([...errors, error]);
    liveManager.onError.add(fn);
    return () => liveManager.onError.delete(fn);
  }, [liveManager, errors]);

  const layoutManager = useMemo(() => new VirtualListLayoutManager(20, 0), []);

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
        {`${errors.at(-1)?.livePlatformId ?? "(undefined)"}\n${
          errors.at(-1)?.errorMessage ?? "(undefined)"
        }`}
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
          height: "100px",
        }}
      >
        <SendComment />
      </div>
    </div>
  );
}
