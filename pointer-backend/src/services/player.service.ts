import { RoomStatePlayer } from "@mikepray/pointer-shared";
import { randomUUID } from "crypto";
import { Player } from "../models/player";
import { rooms } from "./room.service";

export const players: Map<string, Player> = new Map<string, Player>();

export const createPlayer = (name: string, estimate: string | undefined): Player => {
    // create a player
    const newPlayer = new Player(randomUUID(), name, estimate);
    // add the player to the map of players
    players.set(newPlayer.uid, newPlayer);

    return newPlayer;
}

export const getPlayer = (playerUid: string): Player | undefined => {
    return players?.get(playerUid);
}

export const updatePlayer = (updatedPlayer: RoomStatePlayer) => {
    if (players.has(updatedPlayer.uid)) {
        const mergedPlayer = new Player(updatedPlayer.uid, updatedPlayer.name, updatedPlayer.estimate);
        players.set(updatedPlayer.uid, mergedPlayer);
        return mergedPlayer;
    }    
    return undefined;    
}


export const getRoomByPlayerUid = (playerUid: string): string | undefined => {
    // look through all rooms
    for (let [roomId, room] of rooms) {
        // look through all players
        for (let player of room.playerUids) {
            if (player === playerUid) {
                return roomId;
            }
        }
    }
    return undefined;
}
