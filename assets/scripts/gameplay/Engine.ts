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
import { ILevelWordsProvider } from "db://assets/scripts/services/ILevelWordsProvider";
import { WordLettersPlaceSystem } from "db://assets/scripts/gameplay/systems/WordLettersPlaceSystem";
import { ExpiredSessionSystem } from "db://assets/scripts/gameplay/systems/ExpiredSessionSystem";
import { WordAcceptSystem } from "db://assets/scripts/gameplay/systems/WordAcceptSystem";
import { IUserDataRepository } from "db://assets/scripts/services/IUserDataRepository";
import { WordRepeatSystem } from "db://assets/scripts/gameplay/systems/WordRepeatSystem";
import { LevelCompleteSystem } from "db://assets/scripts/gameplay/systems/LevelCompleteSystem";
import { UserDataUpdateSystem } from "db://assets/scripts/gameplay/systems/UserDataUpdateSystem";
import { GameUISystem } from "db://assets/scripts/gameplay/systems/GameUISystem";

type ModelInitOptions = {
    wordsProvider: ILevelWordsProvider;
    user: IUserDataRepository;
};

export class Engine {

    private model: EngineModel;
    private systems: System[];
    private entities: Entity[];

    public init(model: EngineModel, opts: ModelInitOptions) {
        this.model = model;
        this.systems = this.createSystems(this.model, opts);
        this.entities = [];
    }

    private createSystems(model: EngineModel, opts: ModelInitOptions): System[] {
        return [
            new InputLockSystem().attach(model, this),
            new GameStartSystem(opts.wordsProvider, opts.user).attach(model, this),
            new LetterSelectSystem().attach(model, this),
            new CircleLetterScaleSystem().attach(model, this),
            new CircleLettersPlaceSystem().attach(model, this),
            new DrawWordLineSystem().attach(model, this),
            new WordPreviewSystem().attach(model, this),
            new PreviewLetterAnimateSystem().attach(model, this),
            new SwapLettersSystem().attach(model, this),
            new WordLettersPlaceSystem().attach(model, this),
            new ExpiredSessionSystem().attach(model, this),
            new WordAcceptSystem().attach(model, this),
            new WordRepeatSystem().attach(model, this),
            new LevelCompleteSystem().attach(model, this),
            new UserDataUpdateSystem(opts.user).attach(model, this),
            new GameUISystem().attach(model, this),
        ];
    }

    public clear() {
        this.entities.clear();

        this.model.layers.previewLetters.removeAllChildren();
        this.model.layers.wordsLetters.removeAllChildren();
        this.model.layers.circleLetters.removeAllChildren();
        this.model.layers.swapButton.removeAllChildren();
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