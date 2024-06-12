import { EngineLayers } from "db://assets/scripts/gameplay/EngineLayers";
import { EnginePrefabs } from "db://assets/scripts/gameplay/EnginePrefabs";
import { EntityFactory } from "db://assets/scripts/gameplay/entity/EntityFactory";
import { UserData } from "db://assets/scripts/services/StorageService";

export class EngineModel {

    public layers: EngineLayers;
    public prefabs: EnginePrefabs;
    public entities: EntityFactory;
    public user: UserData;

}