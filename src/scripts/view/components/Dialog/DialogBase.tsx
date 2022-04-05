import { css, keyframes } from "@emotion/react";
import React from "react";
import { AnimationState } from "./AnimationState";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  state?: AnimationState;
}

export function DialogBase(props: Props) {
  const { children, state = "opened", ...otherProps } = props;

  return (
    <div
      {...otherProps}
      css={css`
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
          0 6px 6px rgba(0, 0, 0, 0.23);
        max-width: calc(100vw + 4px * 2);
        max-height: calc(100vh + 4px * 2);
        overflow: auto;
        width: auto;
        margin: -4px;

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
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const closing = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
`;
