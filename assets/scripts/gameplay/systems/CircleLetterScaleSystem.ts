import { System } from "db://assets/scripts/gameplay/systems/System";
import { LetterEntity } from "db://assets/scripts/gameplay/entity/Entity";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { tween, Vec3 } from "cc";
import { CircleLetter } from "db://assets/scripts/gameplay/components/CircleLetter";

type ScaleStatus = "idle" | "upscale" | "downscale";


export class CircleLetterScaleSystem extends System {

    private readonly upscaleDuration = 0.12;
    private readonly downscaleDuration = 0.12;
    private readonly normalScale = 1;
    private readonly upscaleScale = 1.2;
    private readonly upscaleSelectRatio = 0.8;
    private readonly downscaleDeselectRatio = 0.3;


    private statuses: Map<LetterEntity, ScaleStatus> = new Map<LetterEntity, ScaleStatus>();

    constructor() {
        super();

        this.listen("letters.upscale", this.onLetterUpscale);
        this.listen("letters.downscale", this.onLetterDownscale);
    }

    private onLetterUpscale(e: EventEntity) {
        const letters = e.info as LetterEntity[];

        letters.forEach(it => {
            if (this.isUpscaling(it)) {
                return;
            }
            this.upscale(it);
        });
    }

    private onLetterDownscale(e: EventEntity) {
        const letters = e.info as LetterEntity[];
        letters.forEach(it => {
            if (this.isDownscaling(it)) {
                return;
            }

            this.downscale(it);
        });
    }

    private isUpscaling(it: LetterEntity) {
        return this.statuses.get(it) === "upscale";
    }

    private isDownscaling(it: LetterEntity) {
        return this.statuses.get(it) === "downscale";
    }

    private upscale(it: LetterEntity) {
        this.statuses.set(it, "upscale");

        tween(it.view.node)
            .to(this.upscaleDuration * this.upscaleSelectRatio, {})
            .call(() => it.view.node.getComponent(CircleLetter).select())
            .start();

        tween(it.view.node)
            .to(this.upscaleDuration, { scale: new Vec3(this.upscaleScale, this.upscaleScale) }, { easing: 'linear'})
            .call(() => this.statuses.set(it, "idle"))
            .start();

    }

    private downscale(it: LetterEntity) {
        this.statuses.set(it, "downscale");

        tween(it.view.node)
            .to(this.downscaleDuration, { scale: new Vec3(this.normalScale, this.normalScale) }, { easing: 'linear' })
            .call(() => this.statuses.set(it, "idle"))
            .start();

        tween(it.view.node)
            .to(this.upscaleDuration * this.downscaleDeselectRatio, {})
            .call(() => it.view.node.getComponent(CircleLetter).deselect())
            .start();
    }
}