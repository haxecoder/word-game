import { JsonAsset, resources } from "cc";

export class LoaderService {

    async loadLevel(levelId: number) {
        const realLevelId = levelId % 3 || 3;
        return this.loadJson(`levels/${ realLevelId }`);
    }

    private async loadJson(path: string) {
        return await new Promise<JsonAsset>((resolve, reject) => {
            resources.load(path, JsonAsset, (err, data) => resolve(data));
        });
    }
}