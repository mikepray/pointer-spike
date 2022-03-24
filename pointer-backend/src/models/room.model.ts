import { Client } from "./client.model";

export class Room {
    roomId: string;
    clients: Array<Client> | undefined;
    constructor(roomId: string) {
        this.roomId = roomId;
    }
}