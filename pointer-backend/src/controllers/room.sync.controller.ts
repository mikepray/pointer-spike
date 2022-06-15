import { IncomingMessage, Server } from "http";
import { WebSocketServer, RawData, WebSocket } from "ws";
import { Duplex } from 'stream';

import { PlayerJoin, PlayerMessage, BroadcastMessage } from "@mikepray/pointer-shared";
import { addPlayerToRoom as playerJoinRoom, createRoom, getRoomState, rooms } from "../services/room.service";
import { getPlayer, players } from "../services/player.service";
import { getSocket, playerWebsocketCache, setPlayerSocket as connectPlayerSocket } from "../services/playerWebsocket.service";

export const initializeWebsocketServer = (server: Server): WebSocketServer => {

    const wss = new WebSocketServer({ "noServer": true });

    wss.on('connection', function (ws: WebSocket, request: IncomingMessage) {
        ws.on('message', function (message: RawData) {
            // onMessage(ws, message);
        });
    });

    // handle upgrade
    server.on('upgrade', function upgrade(request: IncomingMessage, socket: Duplex, head: Buffer): void {
        if (request !== undefined) {
            wss.handleUpgrade(request, socket, head, function done(ws: WebSocket) {
                if (request.url) {
                    let url = new URL(request.url, `http://${request.headers.host}`);
                    if (url.searchParams.get("room") && url.searchParams.has("room") !== null 
                        && url.searchParams.has("playerUid") && url.searchParams.get("playerUid") !== null) {
                        const roomId = url.searchParams.get("room") as string;
                        const playerUid = url.searchParams.get("playerUid") as string;
                        createRoom(roomId)
                        playerJoinRoom(roomId, playerUid)
                        connectPlayerSocket(url.searchParams.get("playerUid") as string, ws);
                        broadcastRoomState(roomId);
                    } 
                }  

                // do keepalive 

                wss.emit('connection', ws, request);
            });
        } else {
            socket.destroy();
        }
    });

    return wss;
};

export const broadcastRoomState = (roomId: string) => {
    const room = rooms.get(roomId);
    room?.playerUids.forEach(playerUid => {
        if (players.has(playerUid)) {
            const player = getPlayer(playerUid);
            const roomState = getRoomState(roomId);
            const socket = getSocket(playerUid);
            if (player !== undefined && roomState !== undefined) {
                // console.log(`broadcasting to client ${playerUid}`);//, ${JSON.stringify(room.getState())}`);//, websocket: ${JSON.stringify(players.get(playerUid)?.webSocketClient)}`)
                socket?.send(JSON.stringify(new BroadcastMessage(roomState)));
            }
        }
    });
}

 // deduplicate websocket/player code (when the user refershes, the ws client doesn't seem to close )

 // finally, figure out the disconnect logic