import { RequestHandler } from "express";
import { getPlayer, updatePlayer, createPlayer, getRoomByPlayerUid } from "../services/player.service";
import { broadcastRoomState } from "./room.sync.controller";
import { RoomStatePlayer } from "@mikepray/pointer-shared";

export const handleGetPlayer: RequestHandler<{ playerUid: string }> = (req, res, next) => {
    const player = getPlayer(req.params.playerUid);
    if (player !== undefined) {
        res.status(200).json(player);
    } else {
        res.status(404).json({ message: "Resource not found" });
    }
}

export const handleCreatePlayer: RequestHandler<{}> = (req, res, next) => {
    console.log('Cookies: ', req.cookies);

    if (req.body as Omit<RoomStatePlayer, "uid">) {
        const player = req.body as Omit<RoomStatePlayer, "uid">;
        const newPlayer = createPlayer(player.name);

        res.cookie('userUid', newPlayer.uid,
            {
                maxAge: 30 * 24 * 60 * 1000, // one month expiration
                httpOnly: true
            });
        res.send(200).json({ message: "Player created" });
    } else {
        res.send(400).json({ message: "Bad Request" });
    }
}

export const handleUpdatePlayer: RequestHandler<{ playerUid: string }> = (req, res, next) => {
    if (req.params.playerUid !== undefined && req.body as Omit<RoomStatePlayer, "playerUid">) {
        const player = req.body as RoomStatePlayer;
        player.uid = req.params.playerUid; // use the player UID in the params, not the request object
        if (updatePlayer(player) !== undefined) {
            const room = getRoomByPlayerUid(player.uid);
            if (room !== undefined) {
                broadcastRoomState(room);
            }
            res.status(200).json({ message: "Player updated" });
        } else {
            res.status(404).json({ message: "Resource not found" });
        }
    } else {
        res.send(400).json({ message: "Bad Request" });
    }
}
