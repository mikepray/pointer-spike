export class PlayerJoin {
    roomId: string
    clientName: string | undefined
    message: string | undefined
    constructor(roomId: string, clientName: string = "", message: string = "") {
        this.roomId = roomId;
        this.clientName = clientName;
        this.message = message;
    }
}

