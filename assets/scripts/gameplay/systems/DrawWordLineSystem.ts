import { System } from "db://assets/scripts/gameplay/systems/System";
import { ChangeSelectedLettersEvent, EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";
import { Color, Graphics, UITransform, Vec2, Vec3 } from "cc";

export class DrawWordLineSystem extends System {

    private savedLetters: LetterEntity[] = [];
    private savedPointer: Vec2 = new Vec2();

    constructor() {
        super();

        this.listen("letters.changeSelected", this.onChangeSelectedLetters);
        this.listen("word.input", this.onWordInput);
    }

    private onWordInput() {
        const graphics = this.model.layers.circleLetters.getComponent(Graphics);
        graphics.clear();
    }

    private onChangeSelectedLetters(e: ChangeSelectedLettersEvent) {
        if (this.savedLetters.length === e.info.letters.length) {
            if (this.savedPointer === e.info.pointer) {
                return;
            }

            this.savedPointer = e.info.pointer;
        }

        this.savedLetters = e.info.letters.slice();

        const uiTransform = this.model.layers.circleLetters.getComponent(UITransform)
        const pointer = uiTransform.convertToNodeSpaceAR(new Vec3(e.info.pointer.x, e.info.pointer.y));

        const graphics = this.model.layers.circleLetters.getComponent(Graphics);

        graphics.clear();
        graphics.lineWidth = 21;

        this.savedLetters.forEach((it, index) => {
            const point1 = it.view.node.position;

            graphics.moveTo(point1.x, point1.y);

            if (index === this.savedLetters.length - 1) {
                return;
            }

            const point2 = this.savedLetters[index + 1].view.node.position;

            graphics.lineTo(point2.x, point2.y);
        });

        graphics.lineTo(pointer.x, pointer.y);

        graphics.strokeColor = new Color("#638EC4");
        graphics.stroke();
    }

}