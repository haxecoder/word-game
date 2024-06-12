import { System } from "db://assets/scripts/gameplay/systems/System";
import { Entity, LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";
import { NodeEventType, Quat, tween, Vec3 } from "cc";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { delay } from "db://assets/scripts/utils/delay";

export class SwapLettersSystem extends System {

    private readonly flyDuration = 0.26;
    private swapButton: Entity;

    constructor() {
        super();

        this.listen("game.ready", this.onGameReady);
        this.listen("words.ready", this.onWordsReady);
        this.listen("level.complete", this.onLevelComplete);
    }

    private onLevelComplete() {
        this.swapButton.view.node.off(NodeEventType.TOUCH_END);
        this.swapButton = null;
    }

    private onWordsReady(e: EventEntity) {
        const words = e.info as string[];
    }

    public override onEntityAdded(entity: Entity) {
        if (entity.type === "button.swap") {
            this.swapButton = entity;

            this.model.layers.swapButton.addChild(entity.view.node);
        }
    }

    private onGameReady() {
        this.swapButton.view.node.on(NodeEventType.TOUCH_END, this.onSwapButton.bind(this));
    }

    private async onSwapButton() {
        this.engine.emitEvent("input.lock");

        const letters = this.engine.getEntitiesByType("letter.circle") as LetterEntity[];

        const startPositions: Vec3[] = [];

        letters.forEach(it => startPositions.push(it.view.node.position.clone()));
        letters.shuffle();

        await this.animate(letters, startPositions);

        this.engine.emitEvent("input.unlock");
    }

    private async animate(letters: LetterEntity[], startPositions: Vec3[]) {
        letters.forEach((it, index) => {
            tween(it.view.node)
                .to(this.flyDuration, { position: startPositions[index] })
                .start();
        });

        await delay(this.flyDuration * 1000);
    }
}