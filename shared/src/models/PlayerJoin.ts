export class PlayerJoin {
    roomId: string
    uid: string | undefined
    clientName: string | undefined
    message: string | undefined
    constructor(roomId: string, uid: string = "", clientName: string = "", message: string = "") {
        this.roomId = roomId;
        this.uid = uid;
        this.clientName = clientName;
        this.message = message;
    }
  
}

