import { randomUUID } from "crypto";
import { RoomState, RoomStatePlayer } from "@mikepray/pointer-shared";

export class Room {
    roomId: string;
    playerUids: Array<string>; // other player UIDs are not returned to other players because they're being used like session tokens
    players: Map<string, string>; // uid, name
    estimations: Map<string, string>; // uid, estimation
    constructor(
        roomId: string,
        playerUids = new Array<string>(),
        players = new Map<string, string>(),
        estimations = new Map<string, string>()) {
        this.roomId = roomId;
        this.playerUids = playerUids;
        this.players = players;
        this.estimations = estimations;
    }

    getState = () => {
        // build a map of player names to estimation selections
        const roomStatePlayers: Array<RoomStatePlayer> = new Array<RoomStatePlayer>();

        for (let [uid, name] of this.players) {
            // make a new UUID to replace the old one, for security
            const rsp = new RoomStatePlayer(randomUUID(), name);
            if (this.estimations.has(uid)) {
                rsp.estimate = this.estimations.get(uid);
            }
            roomStatePlayers.push(rsp);
        }

        return new RoomState(this.roomId, roomStatePlayers);
    }
}