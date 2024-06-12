import { System } from "db://assets/scripts/gameplay/systems/System";
import { locale } from "db://assets/scripts/locale";
import { BaseWindow } from "db://assets/scripts/gameplay/components/BaseWindow";

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

        const baseWindowComponent = windowNode.getComponent(BaseWindow);

        const textActionButton = locale.translate("window.win.btnNextLevel", nextLevel.toString());
        const textBody = locale.translate("window.win.txtBody");
        const textHeader = locale.translate("window.win.txtHeader", currentLevel.toString());

        baseWindowComponent.updateTexts(textHeader, textBody, textActionButton);
        baseWindowComponent.setAction(() => {
            this.engine.emitEvent("level.next");
            this.model.layers.windowLayer.removeChild(windowNode);
        });
    }
}