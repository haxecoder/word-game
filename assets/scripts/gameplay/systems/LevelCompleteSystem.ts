import { System } from "db://assets/scripts/gameplay/systems/System";
import { WinWindow } from "db://assets/scripts/gameplay/components/WinWindow";

export class LevelCompleteSystem extends System {

    constructor() {
        super();

        this.listen("level.complete", this.onLevelComplete);
    }

    private async onLevelComplete() {
        this.engine.clear();

        const windowNode = this.model.prefabs.getWinWindow();
        this.model.layers.windowLayer.addChild(windowNode);

        const nextLevel = this.model.user.currentLevel;
        const currentLevel = nextLevel - 1;

        const window = windowNode.getComponent(WinWindow)
        window.updateTexts(currentLevel, nextLevel);
        window.setAction(() => {
            this.engine.emitEvent("level.next");
            this.model.layers.windowLayer.removeChild(windowNode);
        });
    }
}