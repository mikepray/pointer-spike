import { WebSocket } from "ws";

export const playerWebsocketCache: Map<string, WebSocket> = new Map<string, WebSocket>();

export const getSocket = (playerUid: string): WebSocket | undefined => {
    return playerWebsocketCache.get(playerUid);
}

export const setPlayerSocket = (playerUid: string, socket: WebSocket) => {
    playerWebsocketCache.set(playerUid, socket);
    console.log(`Player ${playerUid} connected to websocket`)
}