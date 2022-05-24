import { RequestHandler } from "express";
import { players } from "../services/player.service";
import { rooms } from "../services/room.service";
import { broadcastRoomState } from "./room.sync.controller";
import { createRoom } from "../services/room.service";
import { createPlayer } from "../services/player.service";

export const handleGetPlayer: RequestHandler<{ playerUid: string }> = (req, res, next) => {
    if (req.body as Omit<RoomPlayer, "name">) {
        if (players.get(req.body?.playerUid)) {
            res.status(200).json(players?.get(req.body?.playerUid));
        } else  {
            res.status(404).json({ message: "Resource not found"});
        }
    }
}

export const handleCreatePlayer: RequestHandler<{ }> = (req, res, next) => {
    console.log('Cookies: ', req.cookies);

    if (req.body as Omit<RoomPlayer, "playerUid">) {
       
            const newPlayer = createPlayer(roomId);
           
            res.cookie('userUid', newPlayer.uid, 
            { 
                maxAge: 30 * 24 * 60 * 1000, // one month expiration
                httpOnly: true 
            });
            res.send(200).json({ message: "Player created"});
        } else {
            res.send(404).json({ message: "No such room"});
        }
    }
}

export const handleUpdatePlayer: RequestHandler<{ roomId: string, playerUid: string }> = (req, res, next) => {
    const roomId = req.params.roomId;
    const roomMessage = req.body as Omit<RoomPlayer, "roomId">;
    // get player, and set nickname
    const player = players.get(roomMessage.playerUid);

    if (player !== undefined) {
        const room = rooms.get(player?.roomId);
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
        res.status(200).json({ message: "Player updated" });
    } else {
        res.status(400).json({ message: "Bad Request" });
    }
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