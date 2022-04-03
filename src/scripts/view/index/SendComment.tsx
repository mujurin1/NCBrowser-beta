import { Box, Tab, Tabs } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { dep } from "../../service/dep";

const tabStyle = {
  minHeight: "30px",
  height: "30px",
};

export function SendComment() {
  const liveStore = dep.getLiveStore();

  const [selectId, setSelectId] = useState(0);

  const changeTab = useCallback((_, value: number) => {
    setSelectId(value);
  }, []);

  const liveTabs = useMemo(
    () =>
      liveStore.lives.map((live) => (
        <Tab
          key={live.livePlatformId}
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
        <div key={live.livePlatformId} hidden={selectId !== i}>
          {live.getViews().sendComment()}
        </div>
      ))}
    </>
  );
}
