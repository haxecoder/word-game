import { System } from "db://assets/scripts/gameplay/systems/System";
import { director } from "cc";

export class ExpiredSessionSystem extends System {

    constructor() {
        super();

        director.getScene().on("sessionExpired", this.onSessionExpired.bind(this));
    }

    private onSessionExpired() {
        this.engine.emitEvent("input.lock");
    }

}