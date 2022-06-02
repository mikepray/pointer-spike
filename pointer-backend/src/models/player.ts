import { WebSocket } from 'ws';

export class Player {
    uid: string;
    roomId: string | undefined;
    name: string;
    estimate: string | undefined;
    webSocketClient: WebSocket | undefined;
    constructor(uid:string, roomId: string | undefined = undefined, name: string, estimate: string | undefined = undefined, webSocketClient: WebSocket | undefined = undefined) {//, nickname: string = "Visitor", estimation: string = "") {
        this.uid = uid;
        this.roomId = roomId;
        this.name = name;
        this.estimate = estimate;
        this.webSocketClient = webSocketClient;
        // this.nickname = nickname;
        // this.estimation = estimation;
    }
}