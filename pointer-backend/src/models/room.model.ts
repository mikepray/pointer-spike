
export class Room {
    roomId: string;
    playerUids: Array<string>; // other player UIDs are not returned to other players because they're being used like session tokens

    constructor(
        roomId: string,
        playerUids = new Array<string>()) {
        this.roomId = roomId;
        this.playerUids = playerUids;
    }
}
