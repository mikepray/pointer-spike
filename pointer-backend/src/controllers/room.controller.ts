import { randomUUID } from "crypto";
import { IncomingMessage } from "http";
import { WebSocketServer, RawData, WebSocket } from "ws";
import { Client } from "../models/client.model";
import { Room } from "../models/room.model";
import { PlayerJoin, PlayerAction } from "pointer-shared";

export const manageRoom = (): WebSocketServer => {
    
    const rooms = new Map<string, Room>();

    const wss = new WebSocketServer({ "noServer": true });
    
    wss.on('connection', function (ws, request: IncomingMessage) {
        console.log('Connection upgraded!');

        ws.on('message', function(message: RawData) {
            onMessage(ws, message, rooms);
        });
        
        ws.on('close', function () {

        });
    });
    
    return wss;
};

const onMessage = (ws: WebSocket, message: RawData, rooms: Map<string, Room>) => {
    console.log(`player message ${message}`);

    const playerMessage = JSON.parse(message.toString());
    if (playerMessage as PlayerJoin) {
        joinRoom(ws, rooms, playerMessage);
    } else if (playerMessage as PlayerAction) {
        
    }

    ws.send('got your message!');
    // wss.clients.forEach(client => client.send('broadcast from server!'))
}

const joinRoom = (ws: WebSocket, rooms: Map<string, Room>, playerJoin: PlayerJoin) => {

    if (playerJoin?.roomId) {
        if (!rooms.get(playerJoin.roomId)) {
            console.log(`Creating room ${playerJoin.roomId}`);
            rooms.set(playerJoin.roomId, new Room(playerJoin.roomId));
        }
        const room = rooms.get(playerJoin.roomId);
        if (room !== undefined && room.clients == undefined) {
            room.clients = new Array<Client>();
            room?.clients?.push(new Client(randomUUID(), ws))
            room?.clients?.forEach(client => {
                client.webSocketClient.send('someone joined the room');
            });
        }
        
    }
}