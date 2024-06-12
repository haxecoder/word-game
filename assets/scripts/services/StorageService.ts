type LocalStorageKey = "user.profile.v1" | "sessionId";

type UserData = {
    currentLevel: number;
    solvedWords: string[];
    sessionId: string;
};

export class StorageService {

    private readonly sessionId = Date.now().toString();

    public async loadUserData() {
        const data = this.getUserData("user.profile.v1") || {
            currentLevel: 1,
            solvedWords: [],
            sessionId: this.sessionId
        };

        return data;
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
        return JSON.parse(data);
    }

    private getLocalStorageItem(key: LocalStorageKey): string | null {
        return window.localStorage.getItem(key);
    }

    private setLocalStorageItem(key: LocalStorageKey, value: string) {
        window.localStorage.setItem(key, value);
    }

}