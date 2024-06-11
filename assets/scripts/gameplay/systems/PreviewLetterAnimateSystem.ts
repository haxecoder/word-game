import { System } from "db://assets/scripts/gameplay/systems/System";
import { AnimatePreviewLettersEvent } from "db://assets/scripts/gameplay/entity/EventEntity";
import { tween, UIOpacity, Vec3 } from "cc";

export class PreviewLetterAnimateSystem extends System {

    private readonly addLetterDuration = 0.08;
    private readonly removeLetterDuration = 0.16;

    private readonly letterOffset = 50;

    private readonly letterAddJumpX = 70;
    private readonly letterRemoveJumpY = 35;

    private readonly defaultUIOpacity = 255;

    constructor() {
        super();

        this.listen("letter.preview.add", this.onPreviewLetterAdd);
        this.listen("letter.preview.remove", this.onPreviewLetterRemove);
    }

    private onPreviewLetterRemove(e: AnimatePreviewLettersEvent) {
        const animated = e.info.letter.view.node;

        tween(animated.getComponent(UIOpacity))
            .to(this.removeLetterDuration, { opacity: 0 })
            .start();

        tween(animated)
            .to(this.removeLetterDuration, { position: new Vec3(animated.position.x, -this.letterRemoveJumpY ) }, { easing: "cubicInOut" })
            .call(() => animated.removeFromParent())
            .start();
    }

    private onPreviewLetterAdd(e: AnimatePreviewLettersEvent) {
        const animated = e.info.letter.view.node;
        const opacityComponent = animated.getComponent(UIOpacity);

        opacityComponent.opacity = 0;
        animated.setPosition(e.info.index * this.letterOffset + this.letterAddJumpX, 0);

        tween(opacityComponent)
            .to(this.addLetterDuration / 1.5, { opacity: this.defaultUIOpacity })
            .start();

        tween(animated)
            .to(this.addLetterDuration, { position: new Vec3(e.info.index * this.letterOffset, 0 ) }, { easing: "cubicInOut" })
            .start();
    }
}