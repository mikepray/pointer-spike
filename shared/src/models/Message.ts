import { BroadcastPlayerAction } from "./BroadcastPlayerAction";
import { PlayerAction } from "./PlayerAction";
import { PlayerJoin } from "./PlayerJoin";

export class Message {
    playerJoin: PlayerJoin | undefined
    playerAction: PlayerAction | undefined
    broadcastPlayerAction: BroadcastPlayerAction | undefined
    constructor(playerJoin: PlayerJoin = undefined, playerAction: PlayerAction = undefined, broadcastPlayerAction: BroadcastPlayerAction = undefined) {
        this.playerJoin = playerJoin;
        this.playerAction = playerAction;
        this.broadcastPlayerAction = broadcastPlayerAction;
    }

}