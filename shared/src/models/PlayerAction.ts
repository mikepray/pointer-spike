export class PlayerAction {
    playerUid: string
    message: string | undefined
    constructor(playerUid: string, message: string = "") {
       this.playerUid = playerUid;
       this.message = message;
   }
}

export class Msg {
    text: string
    constructor(text:string) {
        this.text = text;
    }
}