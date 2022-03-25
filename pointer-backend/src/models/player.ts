import { WebSocket } from 'ws';

export class Player {
    uid: string;
    webSocketClient: WebSocket;
    constructor(uid:string, webSocketClient: WebSocket) {
        this.uid = uid;
        this.webSocketClient = webSocketClient
    }
}