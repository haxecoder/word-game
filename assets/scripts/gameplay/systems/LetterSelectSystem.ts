import { System } from "db://assets/scripts/gameplay/systems/System";
import { EventTouch, Intersection2D, NodeEventType, Vec2 } from "cc";
import { Entity, LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";
import { CircleLetter } from "db://assets/scripts/gameplay/components/CircleLetter";

export class LetterSelectSystem extends System {

    private letters: LetterEntity[] = [];

    private selectedLetters: LetterEntity[] = [];

    private readonly letterRadius = 67;
    private readonly pointerRadius = 1;

    constructor() {
        super();

        this.listen("game.start", this.onGameStarted);
    }

    public override onEntityAdded(entity: Entity) {
        if (entity.type === "letter.circle") {
            this.letters.push(entity as LetterEntity);

            const circleController = entity.view.node.getComponent(CircleLetter);
            circleController.deselect();
        }
    }

    private onGameStarted() {
        this.model.layers.touch.on(NodeEventType.TOUCH_START, this.onPointerMove.bind(this));
        this.model.layers.touch.on(NodeEventType.TOUCH_MOVE, this.onPointerMove.bind(this));
        this.model.layers.touch.on(NodeEventType.TOUCH_END, this.onPointerUp.bind(this));
        this.model.layers.touch.on(NodeEventType.TOUCH_CANCEL, this.onPointerUp.bind(this));
    }

    private onPointerUp() {
        this.emitEvent("letters.downscale", this.letters);
    }

    private onPointerMove(e: EventTouch) {
        this.selectedLetters.clear();

        this.letters.forEach((it, i) => {
            const original = it.view.node.getWorldPosition();
            const position = new Vec2(original.x, original.y);

            const intersects = Intersection2D.circleCircle(e.touch.getUILocation(), this.pointerRadius, position, this.letterRadius);

            if (intersects) {
                this.selectedLetters.push(it);
            }
        });

        this.emitEvent("letters.upscale", this.selectedLetters);
    }

}