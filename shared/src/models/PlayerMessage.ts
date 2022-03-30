import { PlayerJoin } from "./PlayerJoin";

// player messages sent to server
export class PlayerMessage {
    playerJoin: PlayerJoin 
    constructor(playerJoin: PlayerJoin = undefined) {
        this.playerJoin = playerJoin;
    }

}