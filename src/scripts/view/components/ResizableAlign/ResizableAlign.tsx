import { css } from "@emotion/react";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

export interface ResizableAlignProps {
  children: React.ReactNode[];
  cssString?: string;
  /** 幅が変わった時に呼ばれる */
  onResize: (widths: number[], index: number) => void;
  /** カラムの幅 */
  defaultWidths: number[];
  /** 各カラムの最小幅 */
  minWidths: number[];
  /** 他の要素によって幅が縮むカラムインデックス */
  flexIndex: number;
  /** ヘッダーの高さ */
  height: number;
  /**
   * ヘッダーの幅\
   * "auto"なら動的
   */
  width: number;
}

const partitionSize = 3;

export function ResizableAlign(props: ResizableAlignProps) {
  const defaultWidths = useMemo(
    () => props.defaultWidths,
    [props.defaultWidths]
  );
  const minWidths = useMemo(() => props.minWidths, [props.minWidths]);
  const flexIndex = useMemo(() => props.flexIndex, [props.flexIndex]);
  const totalWidth = useMemo(() => props.width, [props.width]);
  const propCss = useMemo(() => props.cssString, [props.cssString]);

  const [widths, setWidths] = useState<number[]>(defaultWidths);
  const [temp, setTemp] = useState<ResizeTemp | null>(null);

  useEffect(() => {
    setWidths(defaultWidths);
  }, [defaultWidths]);

  useEffect(() => {
    let flexWidth = totalWidth;
    for (let i = 0; i < widths.length; i++) {
      if (i === flexIndex) continue;
      flexWidth -= widths[i];
    }
    if (widths[flexIndex] === flexWidth) return;
    widths[flexIndex] = flexWidth;
    setWidths([...widths]);
  }, [flexIndex, totalWidth, widths]);

  const changeWidths = useCallback(
    (clientX: number): boolean => {
      if (temp == null) return false;
      /** 幅の変化量 */
      let amount = clientX - temp.startX;
      if (amount === 0) return false;
      if (!temp.left) amount *= -1;

      widths[temp.index] = temp.startTargetWidth + amount;
      widths[flexIndex] = temp.startFlexWidth - amount;

      const limit = widths[temp.index] - minWidths[temp.index];
      if (limit < 0) {
        widths[temp.index] -= limit;
        widths[flexIndex] += limit;
      } else {
        const limit = widths[flexIndex] - minWidths[flexIndex];
        if (limit < 0) {
          widths[temp.index] += limit;
          widths[flexIndex] -= limit;
        }
      }

      setWidths([...widths]);

      return true;
    },
    [flexIndex, minWidths, temp, widths]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
      const left = index < flexIndex;
      if (!left) index++;
      setTemp({
        index,
        startTargetWidth: widths[index],
        startFlexWidth: widths[flexIndex],
        startX: e.clientX,
        left,
      });
    },
    [flexIndex, widths]
  );
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (temp == null) return;
      changeWidths(e.clientX);
    },
    [changeWidths, temp]
  );
  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      if (temp == null) return;
      changeWidths(e.clientX);
      props.onResize(widths, temp.index);

      setTemp(null);
    },
    [changeWidths, props, temp, widths]
  );

  const childElement: React.ReactElement[] = [];

  useLayoutEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);
  const lastIndex = props.children.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    childElement.push(
      <div
        key={i}
        css={css`
          ${resizerCss}
          width: ${widths[i]}px;
          min-width: ${minWidths[i]}px;
        `}
      >
        {props.children[i]}
        {/* {widths[i]} */}
        <div
          css={css`
            position: absolute;
            top: 0;
            right: 0;
            width: ${partitionSize}px;
            height: 100%;
            background-color: blue;
            cursor: col-resize;
          `}
          onMouseDown={(e) => onMouseDown(e, i)}
        />
      </div>
    );
  }
  childElement.push(
    <div
      key={-1}
      css={css`
        ${resizerCss}
        width: ${widths[lastIndex]}px;
        min-width: ${minWidths[lastIndex]}px;
      `}
    >
      {props.children[lastIndex]}
      {/* {widths[lastIndex]} */}
    </div>
  );

  return (
    <div
      css={css`
        ${propCss}
        display: flex;
        align-items: center;
        text-align: center;
        height: ${props.height}px;
      `}
    >
      {childElement}
    </div>
  );
}

interface ResizeTemp {
  /** ターゲットのインデックス */
  index: number;
  /** 開始時のターゲットのカラムの幅 */
  startTargetWidth: number;
  /** 開始時のフレックスカラムの幅 */
  startFlexWidth: number;
  /** 開始時のマウス座標X */
  startX: number;
  /** フレックスカラムより左か */
  left: boolean;
}

const resizerCss = `
position: relative;
display: flex;
justify-content: center;
align-items: center;
height: 100%;
user-select: none;
`;
