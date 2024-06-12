import { LoaderService } from "db://assets/scripts/services/LoaderService";
import { StorageService } from "db://assets/scripts/services/StorageService";
import { LevelDataProviderService } from "db://assets/scripts/services/LevelDataProviderService";
import { Event, director } from "cc";

class App {

    public storage: StorageService = new StorageService();
    public levels: LevelDataProviderService = new LevelDataProviderService(new LoaderService());

    public async start() {
        await this.storage.updateSessionId();

        document.addEventListener("visibilitychange", async () => {
            const sessionIsActive = await this.storage.isSessionActive();
            if (!sessionIsActive) {
                director.getScene().dispatchEvent(new Event("sessionExpired"));
            }
        });
    }

}

export const app = new App();
await app.start();