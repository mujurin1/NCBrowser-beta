import { Box, Tabs, Tab } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { dep } from "../../service/dep";

const tabStyle = {
  minHeight: "30px",
  height: "30px",
};

/**
 * 放送に接続するためのビュー
 */
export function Connection() {
  const liveStore = dep.liveStore();

  const [selectId, setSelectId] = useState(0);

  const changeTab = useCallback(
    (_, value: number) => {
      setSelectId(value);
    },
    [selectId]
  );

  const liveTabs = useMemo(
    () =>
      liveStore.lives.map((live) => (
        <Tab
          key={live.livePlatformId + Math.random()}
          sx={tabStyle}
          label={live.livePlatformName}
        />
      )),
    [liveStore.lives]
  );

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={tabStyle}
          value={selectId}
          onChange={changeTab}
          aria-label="basic tabs example"
        >
          {liveTabs}
        </Tabs>
      </Box>
      {liveStore.lives.map((live, i) => (
        <div hidden={selectId !== i}>{live.getViews().connect()}</div>
      ))}
    </>
  );
}
