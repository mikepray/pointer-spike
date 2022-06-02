import { RoomState, RoomStatePlayer } from "@mikepray/pointer-shared";
import { Room } from "../models/room.model";
import { getPlayer } from "./player.service";
import { randomUUID } from "crypto";

export const rooms: Map<string, Room> = new Map<string, Room>();

export const createRoom = (roomId: string) => {
    if (!rooms.get(roomId)) {
        console.log(`Creating room ${roomId}`);
        rooms.set(roomId, new Room(roomId));
    }
}

export const addPlayerToRoom = (roomId: string, playerUid: string): Boolean => {
    // get the room
    const room = rooms.get(roomId);

    // add the player UID to the room
    if (room !== undefined && !roomHasPlayer(room.playerUids, playerUid)) {
        return room?.playerUids?.push(playerUid) !== undefined;
    }
    return false;
}

const roomHasPlayer = (array:Array<string>, playerUid: string): Boolean => {
    return array.filter(el => {
        el !== playerUid;
    }).length === 1;
}

export const deleteEstimates = (roomId: string): Boolean => {
    // get players
    const room = rooms.get(roomId);
    if (room !== undefined) {
        room?.playerUids.forEach((playerUid) => {
            const player = getPlayer(playerUid);
            if (player !== undefined) {
                player.estimate = undefined;
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

        for (let [uid] of room.playerUids) {
            const player = getPlayer(uid);
            if (player !== undefined) {
                // make a new UUID to replace the old one, for security
                const rsp = new RoomStatePlayer(randomUUID(), player.name, player.estimate);
               
                roomStatePlayers.push(rsp);
            }
        }

        return new RoomState(roomId, roomStatePlayers);
    }
}