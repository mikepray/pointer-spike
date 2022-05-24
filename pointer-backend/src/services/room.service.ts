import { Room } from "../models/room.model";

export const rooms: Map<string, Room> = new Map<string, Room>();

export const createRoom = (roomId: string) => {
    if (!rooms.get(roomId)) {
        console.log(`Creating room ${roomId}`);
        rooms.set(roomId, new Room(roomId));
    }
}

export const addPlayerToRoom = (roomId: string, playerUid: string): Boolean => {
    // get the room
    const room = rooms.get(roomId);

    // add the player UID to the room
    return room?.playerUids?.push(playerUid) !== undefined;
}

export const deleteEstimates = (roomId: string): Boolean => {
    return rooms.get(roomId)?.estimations.clear() !== undefined;
}