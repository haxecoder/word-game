import { System } from "db://assets/scripts/gameplay/systems/System";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { GameUI } from "db://assets/scripts/gameplay/components/GameUI";
import { locale } from "db://assets/scripts/locale";

export class GameUISystem extends System {

    private uiEntity: Entity;
    private ui: GameUI;

    constructor() {
        super();

        this.listen("game.ready", this.updateCurrentLevelText);
        this.listen("level.next", this.updateCurrentLevelText);
    }

    private updateCurrentLevelText() {
        const currentLevelText = locale.translate("ui.currentLevel", this.model.user.currentLevel.toString());
        this.ui.setCurrentLevelText(currentLevelText);
    }

    public override onEntityAdded(entity: Entity) {
        if (entity.type === "game.ui") {
            this.uiEntity = entity;
            this.ui = entity.view.node.getComponent(GameUI);
            this.model.layers.uiLayer.addChild(entity.view.node);
        }
    }

}