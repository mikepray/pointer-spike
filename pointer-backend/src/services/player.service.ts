import { RoomStatePlayer } from "@mikepray/pointer-shared";
import { randomUUID } from "crypto";
import { Player } from "../models/player";
import { rooms } from "./room.service";

export const players: Map<string, Player> = new Map<string, Player>();

export const createPlayer = (name: string): Player => {
    // create a player
    const newPlayer = new Player(randomUUID(), undefined, name);
    // add the player to the map of players
    players.set(newPlayer.uid, newPlayer);

    return newPlayer;
}

export const getPlayer = (playerUid: string): Player | undefined => {
    return players?.get(playerUid);
}

export const updatePlayer = (updatedPlayer: RoomStatePlayer) => {
    if (players.has(updatedPlayer.uid)) {
        const existingPlayer = players.get(updatedPlayer.uid) as Player;
        const mergedPlayer = new Player(updatedPlayer.uid, existingPlayer.roomId, updatedPlayer.name);
        mergedPlayer.estimate = updatedPlayer.estimate !== null ? updatedPlayer.estimate : existingPlayer.estimate;
        mergedPlayer.webSocketClient = existingPlayer.webSocketClient;

        players.set(updatedPlayer.uid, mergedPlayer);
        return mergedPlayer;
    }    
    return undefined;    
}


export const getRoomByPlayerUid = (playerUid: string): string | undefined => {
    return players.get(playerUid)?.roomId;
}
