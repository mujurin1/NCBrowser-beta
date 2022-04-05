import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

interface Props {
  /**
   * trueの場合childrenがdocumentにマウントされ表示される。falseの場合はchildrenは表示されず、documentにマウントもされない。
   */
  open?: boolean;

  children: React.ReactNode;
}

/**
 * 他のUIより前面に表示されるUIコンポーネントのためのユーティリティ
 *
 * @example
 *
 *  // Virtual DOMツリー中のどこでマウントされても、このメッセージはUIの最前面に表示され、
 *  // 他のコンポーネントによって覆い隠されない
 *  <Popup open>
 *      <h1>Hello World!</h1>
 *  </Popup>
 */
export function Popup(props: Props) {
  const { open = false, children } = props;

  const container = useMemo(() => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.inset = "0";
    return container;
  }, []);

  useEffect(() => {
    if (open) {
      document.body.appendChild(container);
    } else {
      container.parentNode?.removeChild(container);
    }
    return () => {
      container.parentNode?.removeChild(container);
    };
  }, [container, open]);

  return open ? ReactDOM.createPortal(children, container) : null;
}
