import { RefObject, useCallback, useEffect, useLayoutEffect } from "react";

/**
 * UIのフォーカスをコンテナ要素内部に閉じ込める。
 * Tabキーなどでフォーカスがコンテナ要素外へ移動した場合に、自動でフォーカスをコンテナ要素内へ戻す。
 *
 * @param containerRef コンテナ要素のRef
 */
export const useFocusTrap = (containerRef: RefObject<HTMLElement>) => {
  const onBodyFocusIn = useCallback(
    (ev: FocusEvent) => {
      const container = containerRef.current;
      if (container === null) return;

      const newFocusedNode = ev.target as HTMLElement | null;
      if (newFocusedNode === null) return;

      const focusableNodes = getFocusableNodes(container);
      if (focusableNodes.includes(newFocusedNode)) {
        return;
      } else if (focusableNodes.length === 0) {
        container.focus();
      } else {
        const oldFocusedNode = ev.relatedTarget as HTMLElement | null;

        if (oldFocusedNode === focusableNodes[0]) {
          focusableNodes[focusableNodes.length - 1].focus();
        } else {
          focusableNodes[0].focus();
        }
      }
    },
    [containerRef]
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container === null) return;

    (getFocusableNodes(container)[0] ?? container).focus();
  }, [containerRef]);

  useEffect(() => {
    document.body.addEventListener("focusin", onBodyFocusIn);
    return () => {
      document.body.removeEventListener("focusin", onBodyFocusIn);
    };
  }, [onBodyFocusIn]);
};

const getFocusableNodes = (element: HTMLElement): HTMLElement[] =>
  [
    ...element.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    ),
  ] as HTMLElement[];
