// import { SetOnlyTrigger } from "@ncb/common";
// import {
//   UpdateVariation,
//   NcbComment,
//   NcbUser,
//   LiveState,
// } from "@ncb/ncbrowser-definition";
// import { LiveError } from "@ncb/ncbrowser-definition";

// export type LivePlatformId = string;

// /**
//  * チャットが変化したことを通知する
//  */
// export interface LiveNotify {
//   /**
//    * 放送の状態が変化したことを通知する
//    */
//   readonly changeState: SetOnlyTrigger<[LivePlatformId, LiveState]>;

//   /**
//    * コメントが変化（追加・更新・削除）したことを通知する\
//    * 通知を送信する時点で`comment.globalUserId`のユーザーは`changeUsers`により通知されていることを保証する
//    */
//   readonly changeComments: SetOnlyTrigger<
//     [LivePlatformId, UpdateVariation, ...NcbComment[]]
//   >;

//   /**
//    * コメントをしたユーザーが変化（追加・更新・削除）したことを通知する
//    */
//   readonly changeUsers: SetOnlyTrigger<
//     [LivePlatformId, UpdateVariation, ...NcbUser[]]
//   >;

//   /**
//    * Liveでエラーが発生したことを通知する
//    */
//   readonly onError: SetOnlyTrigger<[LiveError]>;
// }
