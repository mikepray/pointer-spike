import { PlayerAction } from "./PlayerAction";
import { PlayerJoin } from "./PlayerJoin";

// player messages sent to server
export class PlayerMessage {
    playerJoin: PlayerJoin | undefined
    playerAction: PlayerAction | undefined
    constructor(playerJoin: PlayerJoin = undefined, playerAction: PlayerAction = undefined) {
        this.playerJoin = playerJoin;
        this.playerAction = playerAction;
    }

}