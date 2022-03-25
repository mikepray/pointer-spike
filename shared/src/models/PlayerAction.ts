export class PlayerAction {
    playerUid: string
    actionName: ActionName
    actionValue: string | undefined
    constructor(playerUid: string, actionName:ActionName, actionValue: string = "") {
       this.playerUid = playerUid;
       this.actionName = actionName;
       this.actionValue = actionValue;
   }
}

export enum ActionName {
    NICKNAME,
    ESTIMATION_SELECTION
}