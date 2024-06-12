export interface ILevelWordsProvider {
    getLevelWords(levelId: number): Promise<string[]>;
}