import { css, keyframes } from "@emotion/react";
import React, { useRef } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { AnimationState } from "./AnimationState";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  state?: AnimationState;
}

export function DropShadow(props: Props) {
  const { children, state = "opened", ...otherProps } = props;

  const baseRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(baseRef);

  return (
    <div
      {...otherProps}
      ref={baseRef}
      css={css`
        outline: none;
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
        background: rgba(0, 0, 0, 0.7);

        ${state === "opening" &&
        css`
          animation: ${opening} 300ms forwards;
        `}

        ${state === "closing" &&
        css`
          animation: ${closing} 300ms forwards;
        `}
      `}
    >
      {children}
    </div>
  );
}

const opening = keyframes`
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const closing = keyframes`
  0% {
    background: rgba(0, 0, 0, 0.7);
  }
  100% {
    background: rgba(0, 0, 0, 0);
  }
`;
