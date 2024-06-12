import { _decorator, Component } from 'cc';
import { Engine } from "db://assets/scripts/gameplay/Engine";
import { EntityFactory } from "db://assets/scripts/gameplay/entity/EntityFactory";
import { EnginePrefabs } from "db://assets/scripts/gameplay/EnginePrefabs";
import { EngineLayers } from "db://assets/scripts/gameplay/EngineLayers";
import { EngineModel } from "db://assets/scripts/gameplay/EngineModel";
import { app } from "db://assets/scripts/app";

const { ccclass} = _decorator;

@ccclass('Gameplay')
export class Gameplay extends Component {

    private engine: Engine;

    protected override start() {
        this.engine = this.createEngine();

        const model = this.createEngineModel(
            this.node.getComponent(EnginePrefabs),
            this.node.getComponent(EngineLayers),
            new EntityFactory()
        );

        this.engine.init(model, {
            wordsProvider: app.levels,
            user: app.storage
        });

        this.engine.start();
    }

    private createEngineModel(prefabs: EnginePrefabs, layers: EngineLayers, entities: EntityFactory) {
        const model = new EngineModel();

        model.layers = layers;
        model.prefabs = prefabs;
        model.entities = entities;

        return model;
    }

    protected override update(dt: number) {
        this.engine!.update(dt);
    }

    private createEngine(): Engine {
        return new Engine();
    }

}