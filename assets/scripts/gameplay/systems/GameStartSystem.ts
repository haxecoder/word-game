import { System } from "db://assets/scripts/gameplay/systems/System";

export class GameStartSystem extends System {

    constructor() {
        super();

        this.listen("game.start", this.onGameStart);
    }

    private onGameStart() {
        this.emitEvent("input.lock");

        this.emitEvent("words.ready", ["брат", "араб", "тарак", "бар", "раб", "бра"]);

        this.emitEvent("input.unlock");
    }
}