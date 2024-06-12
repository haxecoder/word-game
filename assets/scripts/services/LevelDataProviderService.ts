import { ILevelLoader } from "db://assets/scripts/services/ILevelLoader";
import { ILevelWordsProvider } from "db://assets/scripts/services/ILevelWordsProvider";

export class LevelDataProviderService implements ILevelWordsProvider {

    constructor(private readonly loader: ILevelLoader) {}

    public async getLevelWords(levelId: number) {
        const wordsData = await this.loader.loadLevel(levelId);
        return wordsData.json["words"]["ru"] as string[];
    }

}