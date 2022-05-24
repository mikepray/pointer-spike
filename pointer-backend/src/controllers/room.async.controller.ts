import { RequestHandler } from "express";
import { addPlayerToRoom, deleteEstimates, rooms } from "../services/room.service";
import { broadcastRoomState } from "./room.sync.controller";

export const handleDeleteEstimates: RequestHandler<{ roomId: string }> = (req, res, next) => {
    if (deleteEstimates(req.params.roomId)) {
        res.status(200).json({ message: "Estimations Cleared" });
        broadcastRoomState(req.params.roomId);
    } else {
        res.status(404).json({ message: "Resource not found" });
    }
}

export const handleAddPlayerToRoom: RequestHandler<{ roomId: string, playerUid: string }> = (req, res, next) => {
    if (addPlayerToRoom(req.params.roomId, req.params.playerUid)) {
        res.status(200).json({ message: "Player added to room" });
        broadcastRoomState(req.params.roomId);
    } else {
        res.status(404).json({ message: "Resource not found" });
    }

}