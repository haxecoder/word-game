type LocalStorageKey = "user.profile.v1";

type UserData = {
    currentLevel: number;
    solvedWords: string[]
};

export class StorageService {

    public async loadUserData() {
        const data: UserData = this.getData("user.profile.v1") || {
            currentLevel: 1,
            solvedWords: []
        };

        return data;
    }

    private getData(key: LocalStorageKey): any {
        return window.localStorage.getItem(key);
    }

}