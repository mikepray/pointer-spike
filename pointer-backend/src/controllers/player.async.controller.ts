import { RequestHandler, Request, Response } from "express";
import { getPlayer, updatePlayer, createPlayer, getRoomByPlayerUid, players } from "../services/player.service";
import { broadcastRoomState } from "./room.sync.controller";
import { RoomStatePlayer } from "@mikepray/pointer-shared";

export const handleGetPlayer: RequestHandler<{ playerUid: string }> = (req, res, next) => {
    const player = getPlayer(req.params.playerUid);
    if (player !== undefined) {
        res.send(player);
    } else {
        res.sendStatus(404);
    }
}

export const handleCreatePlayer: RequestHandler<{}> = (req: Request, res: Response) => {
    console.log('Cookies: ', req.cookies);
    if (req.body as Omit<RoomStatePlayer, "uid">) {
        const player = req.body as Omit<RoomStatePlayer, "uid">;
        if (player.name) {
            const newPlayer = createPlayer(player.name);
            res.cookie('userUid', newPlayer.uid,
                    {
                        maxAge: 30 * 24 * 60 * 1000, // one month expiration
                        httpOnly: true
                    })
                .send(newPlayer);
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
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
            res.send({ message: "Player updated" });
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }
}
