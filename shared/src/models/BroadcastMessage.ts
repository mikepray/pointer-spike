import { RoomState } from "./RoomState";

export class BroadcastMessage {
    roomState: RoomState
    constructor(roomState: RoomState) {
        this.roomState = roomState;
    }
}