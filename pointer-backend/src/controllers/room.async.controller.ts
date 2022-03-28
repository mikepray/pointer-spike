import { RequestHandler } from "express";
import { players, rooms } from "../server";
import { broadcastRoomState } from "./room.sync.controller";

export class RoomA {
    roomId: string;
    playerUid: string;
    name: string;
    estimation: string | undefined;
    constructor(
        roomId: string,
        playerUid: string,
        name: string,
        estimation: string = "") {
            this.roomId = roomId;
            this.playerUid = playerUid;
            this.name = name;
            this.estimation = estimation;
        }
}

export const updateRoom:  RequestHandler<{roomId: string}> = (req, res, next) => {
    const roomId = req.params.roomId;
    const room = req.body as Omit<RoomA, "roomId">;
    // get player, and set nickname
    const player = players.get(room.playerUid);
    if (player !== undefined) {
        player.nickname = room.name;
        player.estimation = room.estimation;
        broadcastRoomState(roomId);
    }
}

