import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { ResizableAlign } from "./view/components/ResizableAlign/ResizableAlign";
import { IndexComponent } from "./view/index/Index";

ReactDOM.render(
  <React.StrictMode>
    <IndexComponent />
    {/* <TestComponent /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TestComponent() {
  const [width, setWidth] = useState(800);
  const [defaultWidths, setDefaultWidths] = useState([150, 150, 200, 150, 150]);

  const defo = 100;
  const minWidths = [defo, defo, defo, defo, defo];

  const onResize = (widths: number[], index: number) => {
    console.log(widths[index]);
    console.log(widths);
  };

  const changeDefoWidths = useCallback(() => {
    defaultWidths[0] == 150
      ? setDefaultWidths([100, 100, 150, 100, 100])
      : setDefaultWidths([150, 150, 200, 150, 150]);
  }, [defaultWidths]);

  return (
    <div style={{ height: 200, width: 800 }}>
      <Button
        variant="contained"
        onClick={() => setWidth(width == 800 ? 900 : 800)}
      >
        全体幅チェンジ
      </Button>
      <Button variant="contained" onClick={() => changeDefoWidths()}>
        カラム幅チェンジ
      </Button>
      <ResizableAlign
        minWidths={minWidths}
        defaultWidths={defaultWidths}
        flexIndex={2}
        onResize={onResize}
        height={100}
        width={width}
        cssString={`
          background-color: #c8aef2;
        `}
      >
        {[
          <div key="A">A</div>,
          <div key="B">B</div>,
          <div key="C">C</div>,
          <div key="D">D</div>,
          <div key="E">E</div>,
        ]}
      </ResizableAlign>
    </div>
  );
}
