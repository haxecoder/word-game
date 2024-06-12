import { System } from "db://assets/scripts/gameplay/systems/System";
import { AnimatePreviewLettersEvent, WordAcceptEvent } from "db://assets/scripts/gameplay/entity/EventEntity";
import { Node, tween, UIOpacity, UITransform, Vec3 } from "cc";
import { LetterComponent } from "db://assets/scripts/gameplay/components/LetterComponent";

export class PreviewLetterAnimateSystem extends System {

    private readonly addLetterDuration = 0.08;
    private readonly removeLetterDuration = 0.16;
    private readonly acceptLetterDuration = 0.16;

    private readonly letterOffset = 50;

    private readonly letterAddJumpX = 70;
    private readonly letterRemoveJumpY = 35;

    private readonly defaultUIOpacity = 255;

    constructor() {
        super();

        this.listen("letter.preview.add", this.onPreviewLetterAdd);
        this.listen("letter.preview.remove", this.onPreviewLetterRemove);
        this.listen("word.accept", this.onWordAccept);
    }

    private async onWordAccept(e: WordAcceptEvent) {
        e.info.previewLetters.forEach(it => {
            tween(it.view.node)
                .to(this.acceptLetterDuration, { position: new Vec3(it.view.node.position.x, it.view.node.position.y + 100)})
                .call(() => it.view.node.removeFromParent())
                .start();

            tween(it.view.node.getComponent(UIOpacity))
                .to(this.acceptLetterDuration / 3, { opacity: 0})
                .call(() => it.view.node.removeFromParent())
                .start();
        });

        e.info.wordPlace.info.letters.forEach((it, i) => {
            it.view.node.getComponent(LetterComponent).select();
            it.view.node.getComponent(LetterComponent).setLabel(e.info.wordPlace.info.word[i].toUpperCase());
        });
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