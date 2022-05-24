import { randomUUID } from "crypto";
import { Player } from "../models/player";
import { rooms } from "../services/room.service";

export const players: Map<string, Player> = new Map<string, Player>();

export const createPlayer = (): Player => {
    // create a player
    const newPlayer = new Player(randomUUID());

    // add the player to the map of players
    players.set(newPlayer.uid, newPlayer);

    return newPlayer;
}
