import { randomUUID } from "crypto";
import { ClientRequest, IncomingMessage } from "http";
import { WebSocketServer, RawData, WebSocket } from "ws";
import { Player } from "../models/player";
import { Room } from "../models/room.model";
import { PlayerJoin, PlayerAction, ActionName, PlayerMessage, BroadcastMessage, RoomState } from "pointer-shared";
import { BroadcastPlayerAction } from "pointer-shared/dist/models/BroadcastPlayerAction";
import { players, rooms } from "../server";

export const manageRoom = (): WebSocketServer => {

    const wss = new WebSocketServer({ "noServer": true });

    wss.on('connection', function (ws, request: IncomingMessage) {
        ws.on('message', function (message: RawData) {
            onMessage(ws, message);
        });

        ws.on('close', function (ws: WebSocket) {
            // delete player and remove from room
            console.log('player dced');
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

        // assume the incoming message is a Message
        if (playerMessage as PlayerMessage) {
            // if the playerJoin property exists
            if ((playerMessage as PlayerMessage)?.playerJoin) {
                // console.log(`player joining room ${playerMessage.playerJoin.roomId}`);

                joinRoom(ws, playerMessage.playerJoin);
            }
            // if the playerAction property exists
            if ((playerMessage as PlayerMessage)?.playerAction) {
                console.log(`player action ${playerMessage.playerAction.playerUid}, ${playerMessage.playerAction.actionName.toString()}`);

                takeAction(ws, playerMessage.playerAction);
            }
        }
    } catch (e) {
        console.log(`e ${e}`);
    }
    // wss.clients.forEach(client => client.send('broadcast from server!'))
}

const joinRoom = (ws: WebSocket, playerJoin: PlayerJoin) => {

    if (playerJoin?.roomId) {
        // if the room doesn't exist, create it.
        if (!rooms.get(playerJoin.roomId)) {
            console.log(`Creating room ${playerJoin.roomId}`);
            rooms.set(playerJoin.roomId, new Room(playerJoin.roomId));
        }

        // create a player
        const newPlayer = new Player(randomUUID(), playerJoin.roomId, ws);

        // get the room
        const room = rooms.get(playerJoin.roomId);

        // add the player UID to the room
        room?.playerUids?.push(newPlayer.uid);

        // add the player to the map of players
        players.set(newPlayer.uid, newPlayer);

        // get the uid from the new player, and assign it to the player join message
        playerJoin.uid = newPlayer.uid;

        // send a message back to the player who just joined that includes the uid
        ws.send(JSON.stringify(new PlayerMessage(playerJoin)));

        // broadcast a message to the players in the room saying that a player joined
        const bpa = new BroadcastPlayerAction(newPlayer.nickname, ActionName.PLAYER_JOINED, newPlayer.nickname);
        console.log(`nickname was: ${newPlayer.nickname} and the bpa was ${JSON.stringify(bpa)}`)

        broadcastRoomState(newPlayer.roomId);

    }
}
const takeAction = (ws: WebSocket, playerAction: PlayerAction) => {
    // get the player from the given uid
    const player = players.get(playerAction.playerUid);
    console.log(`player action taken by ${player?.nickname}, action = ${playerAction.actionName.toString()}, ${ActionName.NICKNAME.toString()}`);
    if (player !== undefined && playerAction?.actionValue) {
        // if the player action matches "NICKNAME", set the nickname
        if (playerAction.actionName.toString() === ActionName.NICKNAME.toString()) {
            player.nickname = playerAction.actionValue;

            broadcastRoomState(player.roomId);
        }
        // if the player action matches "ESTIMATION_SELECTION"
        if (playerAction.actionName.toString() === ActionName.ESTIMATION_SELECTION.toString()) {
            player.estimation = playerAction.actionValue;
            console.log(`player estimation set ${JSON.stringify(players.get(playerAction.playerUid)?.estimation)}`);

            broadcastRoomState(player.roomId);
        }
    }
}

export const broadcastRoomState = (roomId: string) => {
    const room = rooms.get(roomId);
    room?.playerUids.forEach(playerUid => {
        console.log(`broadcasting to client ${playerUid}, ${JSON.stringify(room.getState())}`);//, websocket: ${JSON.stringify(players.get(playerUid)?.webSocketClient)}`)
        players.get(playerUid)?.webSocketClient.send(JSON.stringify(new BroadcastMessage(room.getState())));
    });
}

 // TODO move the state to the server. store a map of estimations:list<playerUid>. when players set estimation, find their player uid in the 
 // list of estimations and move it from one to the other. return the entire state of the room to the user. refactor the front end 
 // to apply that state to the fe instead of figuring out based on individual actions
 
 // then when users connect, as part of the handshake, return the entire state object too.

 // deduplicate websocket/player code (when the user refershes, the ws client doesn't seem to close )

// add an input to the FE join page to put in the nickname

 // finally, figure out the disconnect logic