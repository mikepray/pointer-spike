import { WebSocket } from 'ws';

export class Player {
    uid: string;
    roomId: string;
    webSocketClient: WebSocket;
    nickname: string;
    estimation: string | undefined;
    constructor(uid:string, roomId: string, webSocketClient: WebSocket, nickname: string = "Visitor", estimation: string = "") {
        this.uid = uid;
        this.roomId = roomId;
        this.webSocketClient = webSocketClient;
        this.nickname = nickname;
        this.estimation = estimation;
    }
}