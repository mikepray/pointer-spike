import { randomUUID } from "crypto";
import { IncomingMessage } from "http";
import { WebSocketServer, RawData, WebSocket } from "ws";
import { Player } from "../models/player";
import { Room } from "../models/room.model";
import { PlayerJoin, PlayerAction, Message, ActionName } from "pointer-shared";

export const manageRoom = (): WebSocketServer => {

    const rooms = new Map<string, Room>();

    const wss = new WebSocketServer({ "noServer": true });

    wss.on('connection', function (ws, request: IncomingMessage) {
        console.log('Connection upgraded!');
// TODO use a map of uid:player, and another map of roomid:players
        ws.on('message', function (message: RawData) {
            onMessage(ws, message, rooms);
        });

        ws.on('close', function () {

        });
    });

    return wss;
};

const onMessage = (ws: WebSocket, message: RawData, rooms: Map<string, Room>) => {
    
    try {
        const playerMessage = JSON.parse(message.toString());
        
        // assume the incoming message is a Message
        if (playerMessage as Message) {
            // if the playerJoin property exists
            if ((playerMessage as Message)?.playerJoin) {
                console.log(`player joining room ${playerMessage.playerJoin.roomId}`);

                joinRoom(ws, rooms, playerMessage.playerJoin);
            }
            // if the playerAction property exists
            if ((playerMessage as Message)?.playerAction) {
                console.log(`player action ${playerMessage.playerAction.playerUid}, ${playerMessage.playerAction.actionName.toString()}`);

                takeAction(ws, rooms, playerMessage.playerAction);
            }
        }
    } catch {
        console.log('unrecognized message');
    }
    // wss.clients.forEach(client => client.send('broadcast from server!'))
}

const joinRoom = (ws: WebSocket, rooms: Map<string, Room>, playerJoin: PlayerJoin) => {

    if (playerJoin?.roomId) {
        if (!rooms.get(playerJoin.roomId)) {
            // if the room doesn't exist, create it.
            console.log(`Creating room ${playerJoin.roomId}`);
            rooms.set(playerJoin.roomId, new Room(playerJoin.roomId));
        }

        // create a player
        const newPlayer = new Player(randomUUID(), ws);
        
        // get the room
        const room = rooms.get(playerJoin.roomId);

        // add the player to the room
        room?.clients?.push(newPlayer);
        
        // get the uid from the new player, and assign it to the player join message
        playerJoin.uid = newPlayer.uid;

        // send a message back to the player who just joined that includes the uid
        ws.send(JSON.stringify(new Message(playerJoin)));
        
    }
}
const takeAction = (ws: WebSocket, rooms: Map<string, Room>, playerAction: PlayerAction) => {
    if (playerAction.playerUid && playerAction?.actionName) {
        if (playerAction.actionName.toString() === ActionName.NICKNAME.toString()) {
            rooms.forEach(room => {
                room.clients.forEach
            })
        }
    }
}

