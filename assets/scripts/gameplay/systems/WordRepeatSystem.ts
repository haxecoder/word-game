import { System } from "db://assets/scripts/gameplay/systems/System";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { WordPlaceEntity } from "db://assets/scripts/gameplay/entity/Entity";
import { tween } from "cc";

export class WordRepeatSystem extends System {

    private readonly shakeOffset = 7;
    private readonly shakeDuration = 0.24;

    constructor() {
        super();

        this.listen("word.repeat", this.onWordRepeat);
    }

    private onWordRepeat(e: EventEntity) {
        this.engine.emitEvent("input.lock");
        const wordPlace = e.info as WordPlaceEntity;

        const container = wordPlace.info.letters[0].view.node.parent;

        tween(container)
            .to(this.shakeDuration, null, {
                easing: "cubicIn",
                onUpdate: (target, ratio) => {
                    container.setPosition(container.position.x + Math.sin(Math.PI * 4 * ratio) * this.shakeOffset, container.position.y);
                }
            })
            .call(() => this.engine.emitEvent("input.unlock"))
            .start();
    }

}