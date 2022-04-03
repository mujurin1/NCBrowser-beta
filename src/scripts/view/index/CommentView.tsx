import { assertNotNullish } from "@ncb/common";
import { NcbComment, UpdateVariation } from "@ncb/ncbrowser-definition";
import React, { useEffect } from "react";
import { dep } from "../../service/dep";
import {
  RowRenderProps,
  VirtualListView,
} from "../components/VirtualList/VirtualList";
import { VirtualListLayoutManager } from "../components/VirtualList/VirtualListLayoutManager";

export interface CommentViewProps {
  height: number;
  width: number;
  layoutManager: VirtualListLayoutManager;
}

export function CommentView(props: CommentViewProps) {
  const chatStore = dep.getChatStore();
  const chatNotify = dep.getChatNotify();

  const layoutManager = props.layoutManager;
  layoutManager.setViewportHeight(props.height);

  useEffect(() => {
    const handler = (
      livePlatformId: string,
      variation: UpdateVariation,
      ...updateComments: NcbComment[] // eslint-disable-line @typescript-eslint/no-unused-vars
    ) => {
      if (variation === "Add") {
        layoutManager.setRowCount(chatStore.comments.length);
      } else if (variation === "Delete" || variation === "Update") {
        throw new Error(
          "VirturalListView コメントの更新：コメントの「削除・更新」は未実装です"
        );
      }
    };
    chatNotify.changeComments.add(handler);
    return () => chatNotify.changeComments.delete(handler);
  }, [chatNotify.changeComments, chatStore.comments, layoutManager]);

  return (
    <VirtualListView
      layoutManager={layoutManager}
      width={props.width}
      height={props.height}
      rowRender={Row}
    />
  );
}

function Row({
  rowLayout: {
    key,
    itemLayout: { index, style },
  },
}: RowRenderProps) {
  const chatStore = dep.getChatStore();

  const comment = chatStore.comments.at(index);
  assertNotNullish(comment);
  const content = comment.content;
  const user = chatStore.users.get(comment.userGlobalId);
  assertNotNullish(user);
  const state = user.status;
  return (
    <div key={key} className="list-view-row" style={style}>
      {/* {`key-${key},i-${index},${chatStore.comments.at(index)?.content?.text}`} */}
      {/* <div className="list-view-row-no">{content.no ?? "--"}</div> */}
      <div className="list-view-row-no">{`inde:${index}-key:${key}`}</div>
      {RowIcon(state.userIconUrl)}
      <div className="list-view-row-name">{state.name}</div>
      {RowTime(content.time)}
      {/* <div className="list-view-row-time">{content.time}</div> */}
      <div className="list-view-row-comment">{content.text}</div>
    </div>
  );
}

function RowIcon(imgSrc?: string) {
  if (imgSrc == null) return <div className="list-view-row-icon" />;
  else return <img className="list-view-row-icon" src={imgSrc} />;
}

function RowTime(time: number) {
  const date = new Date(time);
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return <div className="list-view-row-time">{`${h}:${m}:${s}`}</div>;
}
