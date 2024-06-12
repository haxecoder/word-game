import { IUserDataRepository } from "db://assets/scripts/services/IUserDataRepository";

type LocalStorageKey = "user.profile.v1" | "sessionId";

export type UserData = {
    currentLevel: number;
    solvedWords: string[];
};

export class StorageService implements IUserDataRepository {

    private readonly sessionId = Date.now().toString();

    private profileCompiler = (data: string): UserData => JSON.parse(data);
    private profileDecompiler = (data: UserData): string => JSON.stringify(data);

    public async loadUserData() {
        const data = this.getUserData("user.profile.v1") || {
            currentLevel: 1,
            solvedWords: [],
        } as UserData;

        return data;
    }

    public async saveUserData(data: UserData) {
        this.setLocalStorageItem("user.profile.v1", this.profileDecompiler(data));
    }

    public async isSessionActive() {
        const savedSessionId = await this.getSessionId();
        return Number.parseInt(savedSessionId) <= Number.parseInt(this.sessionId);
    }

    public async getSessionId() {
        return this.getLocalStorageItem("sessionId") || this.sessionId;
    }

    public async updateSessionId() {
        this.setLocalStorageItem("sessionId", this.sessionId);
    }

    private getUserData(key: LocalStorageKey): UserData {
        const data = this.getLocalStorageItem(key);
        return this.profileCompiler(data);
    }

    private getLocalStorageItem(key: LocalStorageKey): string | null {
        return window.localStorage.getItem(key);
    }

    private setLocalStorageItem(key: LocalStorageKey, value: string) {
        window.localStorage.setItem(key, value);
    }

}