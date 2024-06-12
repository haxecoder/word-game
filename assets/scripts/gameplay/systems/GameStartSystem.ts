import { System } from "db://assets/scripts/gameplay/systems/System";
import { ILevelWordsProvider } from "db://assets/scripts/services/ILevelWordsProvider";

export class GameStartSystem extends System {

    constructor(private readonly wordsProvider: ILevelWordsProvider) {
        super();

        this.listen("game.start", this.onGameStart);
    }

    private async onGameStart() {
        this.emitEvent("input.lock");

        this.engine.add(this.model.entities.createSwapButton(this.model.prefabs.getSwapButton()));

        const words = await this.wordsProvider.getLevelWords(1);
        this.emitEvent("words.ready", words.slice());

        this.emitEvent("game.ready");
        this.emitEvent("input.unlock");
    }
}