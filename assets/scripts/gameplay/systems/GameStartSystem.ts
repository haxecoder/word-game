import { System } from "db://assets/scripts/gameplay/systems/System";
import { app } from "db://assets/scripts/app";

export class GameStartSystem extends System {

    constructor() {
        super();

        this.listen("game.start", this.onGameStart);
    }

    private async onGameStart() {
        this.emitEvent("input.lock");

        this.engine.add(this.model.entities.createSwapButton(this.model.prefabs.getSwapButton()))

        const wordsData = await app.loader.loadLevel(1);

        const words: string[] = wordsData.json["words"]["ru"];

        this.emitEvent("words.ready", words);

        this.emitEvent("input.unlock");
        this.emitEvent("game.ready");
    }
}