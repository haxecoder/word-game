import { JsonAsset } from "cc";

export interface ILevelLoader {
    loadLevel(levelId: number): Promise<JsonAsset>;
}