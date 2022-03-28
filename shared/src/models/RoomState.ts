export class RoomState {
    roomId: string;
    playerNames: Array<String>;
    playerEstimations: Map<string, string>;
    constructor(roomId: string, playerNames: Array<String>, playerEstimations: Map<string, string>) {
        this.roomId = roomId;
        this.playerNames = playerNames;
        this.playerEstimations = playerEstimations;
    }
}