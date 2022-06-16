
export class Player {
    uid: string;
    name: string;
    estimate: string | undefined;
    constructor(uid:string, name: string, estimate: string | undefined = undefined) {//, nickname: string = "Visitor", estimation: string = "") {
        this.uid = uid;
        this.name = name;
        this.estimate = estimate;
    }
}   