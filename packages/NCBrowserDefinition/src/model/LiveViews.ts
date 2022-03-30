/**
 * 放送のビュー
 */
export interface LiveViews {
  /**
   * 放送に接続するためのビュー
   */
  readonly connect: () => JSX.Element;
  /**
   * 放送にコメントをするためのビュー
   */
  readonly sendComment: () => JSX.Element;
}

// /**
//  * 放送に接続するためのビュー
//  */
// export interface ConnectLiveView {
//   /**
//    * 配信プラットフォームID
//    */
//   readonly livePlatformId: string;

//   /**
//    * 放送に接続するためのビュー
//    */
//   readonly liveConnectView: JSX.Element;
// }

// /**
//  * 放送にコメントをするためのビュー
//  */
// export interface SendCommentView {
//   /**
//    * 配信プラットフォームID
//    */
//   readonly livePlatformId: string;

//   /**
//    * 放送にコメントをするためのビュー
//    */
//   readonly sendCommentView: JSX.Element;
// }
