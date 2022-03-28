import { RoomState } from "pointer-shared";

export class Room {
    roomId: string;
    playerUids: Array<string>; // other player UIDs are not returned to other players because they're being used like session tokens
    players: Map<string, string>;
    estimations: Map<string, Estimation>;
    constructor(
        roomId: string,
        playerUids = new Array<string>(),
        players = new Map<string, string>(),
        estimations = new Map<string, Estimation>()) {
        this.roomId = roomId;
        this.playerUids = playerUids;
        this.players = players;
        this.estimations = estimations;
    }

    getState = () => {
        // build a map of player names to estimation selections
        const playerNameToEstimations = new Map<string, string>();
        
        for (let key in this.players.keys()) {
            if (this.estimations.has(key)) {
                playerNameToEstimations.set(key, this.estimations.get(key)!.toString());
            }
        }

        const playerNames: Array<string> = new Array<string>();
        for (let player in this.players.values()) {
            playerNames.push(player);
        }

        return new RoomState(this.roomId, playerNames, playerNameToEstimations);
    }
}

export enum Estimation {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FIVE = 5,
    EIGHT = 8,
    THIRTEEN = 13
}