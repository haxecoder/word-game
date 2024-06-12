import { EventTouch, Intersection2D, NodeEventType, Vec2 } from "cc";
import { System } from "db://assets/scripts/gameplay/systems/System";
import { Entity, LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";
import { LetterComponent } from "db://assets/scripts/gameplay/components/LetterComponent";
import { ChangeSelectedLettersEventInfo } from "db://assets/scripts/gameplay/entity/EventEntity";

type LetterPointerStatus = "over" | "idle" | "out" | "deselected";

export class LetterSelectSystem extends System {

    private letters: LetterEntity[] = [];
    private selectedLetters: LetterEntity[] = [];
    private intersectionStatuses: Map<LetterEntity, LetterPointerStatus> = new Map<LetterEntity, LetterPointerStatus>();

    private readonly letterRadius = 50;
    private readonly pointerRadius = 1;

    constructor() {
        super();

        this.listen("game.ready", this.onGameReady);
    }

    public override onEntityAdded(entity: Entity) {
        if (entity.type === "letter.circle") {
            this.letters.push(entity as LetterEntity);

            const circleController = entity.view.node.getComponent(LetterComponent);
            circleController.deselect();

            this.intersectionStatuses.set(entity as LetterEntity, "idle");
        }
    }

    private onGameReady() {
        this.model.layers.touch.on(NodeEventType.TOUCH_START, this.onPointerMove.bind(this));
        this.model.layers.touch.on(NodeEventType.TOUCH_MOVE, this.onPointerMove.bind(this));
        this.model.layers.touch.on(NodeEventType.TOUCH_END, this.onPointerUp.bind(this));
        this.model.layers.touch.on(NodeEventType.TOUCH_CANCEL, this.onPointerUp.bind(this));
    }

    private onPointerUp() {
        if (this.selectedLetters.length) {
            this.emitEvent("word.input", this.selectedLetters.slice());
        }

        this.selectedLetters.clear();
        this.letters.forEach(it => this.intersectionStatuses.set(it, "idle"));
        this.emitEvent("letters.downscale", this.letters);
    }

    private onPointerMove(e: EventTouch) {
        const pointerPosition = e.touch.getUILocation();

        this.letters.forEach(it => {
            const original = it.view.node.getWorldPosition();
            const position = new Vec2(original.x, original.y);
            const intersects = Intersection2D.circleCircle(pointerPosition, this.pointerRadius, position, this.letterRadius);

            const intersectionStatus = this.intersectionStatuses.get(it);

            if (intersects) {
                if (intersectionStatus === "idle") {
                    this.intersectionStatuses.set(it, "over");
                    this.selectedLetters.push(it);
                    this.emitEvent("letters.upscale", [ it ]);
                }

                if (intersectionStatus === "out" && this.selectedLetters.indexOf(it) === this.selectedLetters.length - 2) {
                    const deselected = this.selectedLetters.pop();
                    this.intersectionStatuses.set(deselected, "deselected");
                    this.emitEvent("letters.downscale", [ deselected ]);
                }
            } else {
                if (intersectionStatus === "over") {
                    this.intersectionStatuses.set(it, "out");
                }

                if (intersectionStatus === "deselected") {
                    this.intersectionStatuses.set(it, "idle");
                }
            }
        });

        this.engine.emitEvent("letters.changeSelected", {
            letters: this.selectedLetters,
            pointer: e.getUILocation()
        } as ChangeSelectedLettersEventInfo);
    }

}