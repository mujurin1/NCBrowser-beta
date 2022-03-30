/* 下記2つのAPIに関するページ
 * https://github.com/niconamaworkshop/websocket_api_document
 */
export * from "./websocket/niconamaCommentWsReceive";
export * from "./websocket/niconamaSystemWsReceive";
export * from "./types";
// ニコ生のAPI
export * from "./niconama-api/common";
export * from "./niconama-api/GetUnamaProgramsRooms";
export * from "./niconama-api/PutUnamaProgramsExtension";
// OAUTH関連のAPI
export * from "./noauth-api/NOAuthGetIdTokens";
export * from "./oauthGetServer";
// WebSocket
export * from "./websocket/NiconamaCommentWs";
export * from "./websocket/niconamaCommentWsReceive";
export * from "./websocket/niconamaCommentWsSend";
export * from "./websocket/niconamaSystemWsReceive";
export * from "./websocket/niconamaSystemWsSend";

export const NicoApiValueIndex = "NICONICO_INDEX";
export const NicoApiValueIndexX = "NICONICO_INDEX";
