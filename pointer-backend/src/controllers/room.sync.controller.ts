import { randomUUID } from "crypto";
import { IncomingMessage } from "http";
import { WebSocketServer, RawData, WebSocket } from "ws";
import { Player } from "../models/player";
import { Room } from "../models/room.model";
import { PlayerJoin, PlayerMessage, BroadcastMessage } from "@mikepray/pointer-shared";
import { players, rooms } from "../server";

export const manageRoom = (): WebSocketServer => {

    const wss = new WebSocketServer({ "noServer": true });

    wss.on('connection', function (ws, request: IncomingMessage) {
        ws.on('message', function (message: RawData) {
            onMessage(ws, message);
        });

        ws.on('close', function (ws: WebSocket) {
            // delete player and remove from room
            console.log('player disconnect');
            players.forEach(player => {
                if (player.webSocketClient === ws) {
                    console.log('found websocket')
                    players.delete(player.uid);
                }
            });
        });
    });

    return wss;
};

const onMessage = (ws: WebSocket, message: RawData) => {
    
    try {
        const playerMessage = JSON.parse(message.toString());

        // assume the incoming message is a PlayerMessage
        if (playerMessage as PlayerMessage) {
            // if the playerJoin property exists
            if ((playerMessage as PlayerMessage)?.playerJoin) {              
                joinRoom(ws, playerMessage.playerJoin);
            }
            if ((playerMessage as PlayerMessage)?.keepAlive) {
                // no op: keep alive
            }
        } 
    } catch (e) {
        console.log(`e ${e}`);
    }
}

const joinRoom = (ws: WebSocket, playerJoin: PlayerJoin) => {
    
    // client needs to send cookie in ws message body

    // get the uid from the new player, and assign it to the player join message
    playerJoin.uid = ???;

    // send a message back to the player who just joined that includes the uid
    ws.send(JSON.stringify(new PlayerMessage(playerJoin)));

    // broadcast a message to the players in the room saying when a player joins
    broadcastRoomState(newPlayer.roomId);

}

export const broadcastRoomState = (roomId: string) => {
    const room = rooms.get(roomId);
    room?.playerUids.forEach(playerUid => {
        console.log(`broadcasting to client ${playerUid}`);//, ${JSON.stringify(room.getState())}`);//, websocket: ${JSON.stringify(players.get(playerUid)?.webSocketClient)}`)
        players.get(playerUid)?.webSocketClient.send(JSON.stringify(new BroadcastMessage(room.getState())));
    });
}

 // TODO refactor the front end to apply that state to the fe instead of figuring out based on individual actions
 
 // deduplicate websocket/player code (when the user refershes, the ws client doesn't seem to close )

 // finally, figure out the disconnect logic