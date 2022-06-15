import { RequestHandler } from "express";
import { addPlayerToRoom, deleteEstimates, rooms } from "../services/room.service";
import { broadcastRoomState } from "./room.sync.controller";

export const handleDeleteEstimates: RequestHandler<{ roomId: string }> = (req, res, next) => {
    if (deleteEstimates(req.params.roomId)) {
        res.sendStatus(200);
        broadcastRoomState(req.params.roomId);
    } else {
        res.sendStatus(404);
    }
}