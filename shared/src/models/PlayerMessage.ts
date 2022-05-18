import { PlayerJoin } from "./PlayerJoin";

// player messages sent to server
export class PlayerMessage {
    playerJoin: PlayerJoin | undefined;
    keepAlive: Boolean | undefined;
    constructor(playerJoin: PlayerJoin = undefined, keepAlive: Boolean = undefined) {
        this.playerJoin = playerJoin;
        this.keepAlive = keepAlive;
    }

}