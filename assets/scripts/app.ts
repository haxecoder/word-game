import { LoaderService } from "db://assets/scripts/services/LoaderService";
import { StorageService } from "db://assets/scripts/services/StorageService";
import { LevelDataProviderService } from "db://assets/scripts/services/LevelDataProviderService";

class App {

    public storage: StorageService = new StorageService();
    public levels: LevelDataProviderService = new LevelDataProviderService(new LoaderService());

}

export const app = new App();