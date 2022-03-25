import { Client } from "./client.model";

export class Room {
    roomId: string;
    clients: Array<Client>;
    constructor(roomId: string, clients = new Array<Client>()) {
        this.roomId = roomId;
        this.clients = clients;
    }
}