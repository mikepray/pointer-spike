export class Room {
    roomId: string;
    playerUids: Array<string>;
    constructor(roomId: string, playerUids = new Array<string>()) {
        this.roomId = roomId;
        this.playerUids = playerUids;
    }
}