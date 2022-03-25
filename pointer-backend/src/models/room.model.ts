import { Player } from "./player";

export class Room {
    roomId: string;
    clients: Array<Player>;
    constructor(roomId: string, clients = new Array<Player>()) {
        this.roomId = roomId;
        this.clients = clients;
    }
}