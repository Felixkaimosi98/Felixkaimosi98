import WebSocket from "ws";
export function createDerivConnection(app_id) {
  return new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
}
export function authorize(ws, token) {
  ws.send(JSON.stringify({ authorize: token }));
}
