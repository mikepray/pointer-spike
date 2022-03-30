export class RoomState {
    roomId: string;
    players: Array<RoomStatePlayer>;
    constructor(roomId: string, players: Array<RoomStatePlayer> = new Array<RoomStatePlayer>()) {
        this.roomId = roomId;
        this.players = players;
    }
}

export class RoomStatePlayer {
    uid: string;
    name: string;
    estimate: string | undefined;
    constructor(uid: string, name: string, estimate: string = "") {
        this.uid = uid;
        this.name = name;
        this.estimate = estimate;
    }
}