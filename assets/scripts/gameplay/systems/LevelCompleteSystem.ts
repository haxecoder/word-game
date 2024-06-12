import { System } from "db://assets/scripts/gameplay/systems/System";

export class LevelCompleteSystem extends System {

    constructor() {
        super();

        this.listen("level.complete", this.onLevelComplete);
    }

    private onLevelComplete() {
        this.engine.emitEvent("input.lock");


    }
}