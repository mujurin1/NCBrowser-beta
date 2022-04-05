import React, { useCallback, useEffect, useState } from "react";
import { Popup } from "../Popup/Popup";
import { AnimationState } from "./AnimationState";
import { DialogBase } from "./DialogBase";
import { DropShadow } from "./Dropshadow";

interface Props {
  /**
   * trueの場合dialogが表示される。
   */
  open?: boolean;

  /**
   * バックドロップ(ダイアログ外部の暗いエリア)がクリックされた際によばれるコールバック
   */
  onClose?: () => void;

  children?: React.ReactNode;
}

export function Dialog(props: Props) {
  const { open = true, onClose, children } = props;

  const [animationState, setAnimationState] = useState<AnimationState>(
    open ? "opened" : "closed"
  );

  useEffect(() => {
    if (open) {
      setAnimationState((oldState) =>
        oldState === "closed" ? "opening" : oldState
      );
    } else {
      setAnimationState((oldState) =>
        oldState === "opened" ? "closing" : oldState
      );
    }
  }, [open]);

  const onDropShadowAnimationEnd = useCallback(() => {
    setAnimationState((oldState) => {
      switch (oldState) {
        case "opening":
          return "opened";
        case "closing":
          return "closed";
        default:
          return oldState;
      }
    });
  }, []);

  const onDropShadowClick = useCallback(
    (ev: React.MouseEvent) => {
      ev.stopPropagation();
      onClose?.();
    },
    [onClose]
  );

  const onDropShadowKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (ev.key === "Escape") {
        onClose?.();
      }
    },
    [onClose]
  );

  const onDialogBaseAnimationEnd = useCallback((ev: React.AnimationEvent) => {
    // DropShadowへAnimationEndイベントが伝搬するのを防ぎ意図せず状態が遷移するのを防ぐ
    ev.stopPropagation();
  }, []);

  const onDialogBaseClick = useCallback((ev: React.MouseEvent) => {
    // DropShadowへクリックイベントが伝搬するのを防ぎ、ダイアログが閉じないようにする
    ev.stopPropagation();
  }, []);

  return (
    <Popup open={animationState !== "closed"}>
      <DropShadow
        state={animationState}
        onAnimationEnd={onDropShadowAnimationEnd}
        onClick={onDropShadowClick}
        onKeyDown={onDropShadowKeyDown}
        tabIndex={0}
      >
        <DialogBase
          state={animationState}
          onAnimationEnd={onDialogBaseAnimationEnd}
          onClick={onDialogBaseClick}
        >
          {children}
        </DialogBase>
      </DropShadow>
    </Popup>
  );
}
