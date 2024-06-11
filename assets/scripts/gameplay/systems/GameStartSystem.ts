import { System } from "db://assets/scripts/gameplay/systems/System";
import { app } from "db://assets/scripts/app";

export class GameStartSystem extends System {

    constructor() {
        super();

        this.listen("game.start", this.onGameStart);
    }

    private async onGameStart() {
        this.emitEvent("input.lock");

        const wordsData = await app.loader.loadLevel(1);

        const words: string[] = wordsData.json["words"]["ru"];

        this.emitEvent("words.ready", words);

        this.emitEvent("input.unlock");
    }
}