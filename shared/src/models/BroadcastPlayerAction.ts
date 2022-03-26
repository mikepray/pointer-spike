import { ActionName } from "./PlayerAction";

export class BroadcastPlayerAction {
    playerName: string
    actionName: ActionName
    actionValue: string | undefined
    constructor(playerName: string, actionName: ActionName, actionValue: string = "") {
        this.playerName = playerName;
        this.actionName = actionName;
        this.actionValue = actionValue;
    }
}