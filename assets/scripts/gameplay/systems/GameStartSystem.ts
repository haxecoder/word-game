import { System } from "db://assets/scripts/gameplay/systems/System";
import { ILevelWordsProvider } from "db://assets/scripts/services/ILevelWordsProvider";
import { IUserDataRepository } from "db://assets/scripts/services/IUserDataRepository";

export class GameStartSystem extends System {

    constructor(
        private readonly wordsProvider: ILevelWordsProvider,
        private readonly user: IUserDataRepository
    ) {
        super();

        this.listen("game.start", this.onGameStart);
        this.listen("level.next", this.onLevelNext);
    }

    private async onLevelNext() {
        this.emitEvent("input.lock");
        const words = await this.wordsProvider.getLevelWords(this.model.user.currentLevel);
        this.emitEvent("words.ready", words.slice());
        this.engine.add(this.model.entities.createSwapButton(this.model.prefabs.getSwapButton()));

        this.emitEvent("game.ready");
        this.emitEvent("input.unlock");
    }

    private async onGameStart() {
        this.emitEvent("input.lock");

        this.model.user = await this.user.loadUserData();
        await this.user.saveUserData(this.model.user);

        this.engine.add(this.model.entities.createSwapButton(this.model.prefabs.getSwapButton()));
        this.engine.add(this.model.entities.createGameUI(this.model.prefabs.getGameUI()));

        const words = await this.wordsProvider.getLevelWords(this.model.user.currentLevel);
        this.emitEvent("words.ready", words.slice());

        this.emitEvent("game.ready");
        this.emitEvent("input.unlock");
    }
}