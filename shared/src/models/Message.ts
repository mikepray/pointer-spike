import { PlayerAction } from "./PlayerAction";
import { PlayerJoin } from "./PlayerJoin";

export class Message {
    playerJoin: PlayerJoin | undefined
    playerAction: PlayerAction | undefined
    constructor(playerJoin: PlayerJoin = undefined, playerAction: PlayerAction = undefined) {
        this.playerJoin = playerJoin;
        this.playerAction = playerAction;
    }

}