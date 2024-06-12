import { EngineModel } from "db://assets/scripts/gameplay/EngineModel";
import { Entity, EntityType } from "db://assets/scripts/gameplay/entity/Entity";
import { System } from "db://assets/scripts/gameplay/systems/System";
import { EventEntity, EventType } from "db://assets/scripts/gameplay/entity/EventEntity";
import { InputLockSystem } from "db://assets/scripts/gameplay/systems/InputLockSystem";
import { GameStartSystem } from "db://assets/scripts/gameplay/systems/GameStartSystem";
import { LetterSelectSystem } from "db://assets/scripts/gameplay/systems/LetterSelectSystem";
import { CircleLetterScaleSystem } from "db://assets/scripts/gameplay/systems/CircleLetterScaleSystem";
import { CircleLettersPlaceSystem } from "db://assets/scripts/gameplay/systems/CircleLettersPlaceSystem";
import { DrawWordLineSystem } from "db://assets/scripts/gameplay/systems/DrawWordLineSystem";
import { WordPreviewSystem } from "db://assets/scripts/gameplay/systems/WordPreviewSystem";
import { PreviewLetterAnimateSystem } from "db://assets/scripts/gameplay/systems/PreviewLetterAnimateSystem";
import { SwapLettersSystem } from "db://assets/scripts/gameplay/systems/SwapLettersSystem";

export class Engine {

    private model: EngineModel;
    private systems: System[];
    private entities: Entity[];

    public init(model: EngineModel) {
        this.model = model;
        this.systems = this.createSystems(this.model);
        this.entities = [];
    }

    private createSystems(model: EngineModel): System[] {
        return [
            new InputLockSystem().attach(model, this),
            new GameStartSystem().attach(model, this),
            new LetterSelectSystem().attach(model, this),
            new CircleLetterScaleSystem().attach(model, this),
            new CircleLettersPlaceSystem().attach(model, this),
            new DrawWordLineSystem().attach(model, this),
            new WordPreviewSystem().attach(model, this),
            new PreviewLetterAnimateSystem().attach(model, this),
            new SwapLettersSystem().attach(model, this),
        ];
    }

    public emitEvent(type: EventType, info?: any) {
        const event = { type, info } as EventEntity;
        this.systems?.forEach(it => it.onEvent(event));
    }

    public add(entity: Entity) {
        this.entities.push(entity);
        this.systems?.forEach(it => it.onEntityAdded(entity));
    }

    public remove(entity: Entity) {
        this.entities.remove(entity);
        this.systems?.forEach(it => it.onEntityRemoved(entity));
    }

    public update(deltaTime: number) {
        this.systems?.forEach(it => it.update(deltaTime));
    }

    public onEntityNodeInitialized(entity: Entity) {
        this.systems?.forEach(it => it.onEntityNodeInitialized(entity));
    }

    public start() {
        this.emitEvent("game.start");
    }

    public getEntitiesByType(e: EntityType): Entity[] {
        return this.entities.filter(it => it.type === e).slice();
    }
}