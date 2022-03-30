import { RequestHandler } from "express";
import { players, rooms } from "../server";
import { broadcastRoomState } from "./room.sync.controller";

export const updateRoomPlayer:  RequestHandler<{roomId: string, playerUid: string}> = (req, res, next) => {
    const roomId = req.params.roomId;
    const roomMessage = req.body as Omit<RoomPlayer, "roomId">;
    // get player, and set nickname
    const player = players.get(roomMessage.playerUid);
    
    if (player !== undefined) {
        const room = rooms.get(player?.roomId)
        // set the estimation, deleting the previous estimation if there was one
        if (roomMessage?.estimation === undefined) {
            room?.estimations.delete(player.uid);
        } else {
            room?.estimations.set(player.uid, roomMessage.estimation);
        } 
        
        // set the player name, deleting the previous player name if there was one
        if (roomMessage?.name === undefined) {
            room?.players.delete(player.uid);
        } else {
            room?.players.set(player.uid, roomMessage.name);
        }
        
        broadcastRoomState(roomId);
        res.status(200).json({message: "Player updated"});
    } else {
        res.status(400).json({message: "Bad Request"});
    }
}

export const deleteEstimates: RequestHandler<{roomId: string}> = (req, res, next) => {
    const room = rooms.get(req.params.roomId);
    room?.estimations.clear();
    res.status(200).json({message: "Estimations Cleared"});
    broadcastRoomState(req.params.roomId);
}

export class RoomPlayer {
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
