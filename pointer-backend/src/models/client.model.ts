import { WebSocket } from 'ws';

export class Client {
    uid: string;
    webSocketClient: WebSocket;
    constructor(uid:string, webSocketClient: WebSocket) {
        this.uid = uid;
        this.webSocketClient = webSocketClient
    }
}