import { RoomState, RoomStatePlayer } from "@mikepray/pointer-shared";
import { Room } from "../models/room.model";
import { getPlayer } from "./player.service";
import { randomUUID } from "crypto";

export const rooms: Map<string, Room> = new Map<string, Room>();

export const createRoom = (roomId: string) => {
    if (!rooms.get(roomId)) {
        console.log(`Created room ${roomId}`);
        rooms.set(roomId, new Room(roomId));
    }
}

export const addPlayerToRoom = (roomId: string, playerUid: string): Boolean => {
    // get the room
    const room = rooms.get(roomId);

    // add the player UID to the room
    if (room !== undefined && !roomHasPlayer(room.playerUids, playerUid)) {
        console.log(`Player joined room ${roomId}: ${playerUid} `)
        return room?.playerUids?.push(playerUid) !== undefined;
    }
    return false;
}

const roomHasPlayer = (roomPlayers:Array<string>, playerUid: string): Boolean => {
   let hasPlayer = false;
    for (let player of roomPlayers) {
        if (player === playerUid) {
            hasPlayer = true;
            break;
        }
    }
   return hasPlayer;
}

export const deleteEstimates = (roomId: string): Boolean => {
    // get players
    const room = rooms.get(roomId);
    if (room !== undefined) {
        room?.playerUids.forEach((playerUid) => {
            const player = getPlayer(playerUid);
            if (player !== undefined) {
                player.estimate = "None";
            }
        });
        return true;
    }
    return false;
}

export const getRoomState = (roomId: string) => {
    if (rooms.has(roomId)) {
        const room = rooms.get(roomId) as Room;
        // build a map of player names to estimation selections
        const roomStatePlayers: Array<RoomStatePlayer> = new Array<RoomStatePlayer>();
        for (let uid of room.playerUids) {
            const player = getPlayer(uid);
            // console.log(`looking through room ${roomId} for players, found player ${uid} with name ${player?.name} est ${player?.estimate}`)
            if (player !== undefined) {
                // make a new UUID to replace the old one, for security
                const rsp = new RoomStatePlayer(randomUUID(), player.name, player.estimate);
                roomStatePlayers.push(rsp);
            }
        }

        return new RoomState(roomId, roomStatePlayers);
    }
}