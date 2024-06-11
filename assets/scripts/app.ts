import { LoaderService } from "db://assets/scripts/services/LoaderService";
import { StorageService } from "db://assets/scripts/services/StorageService";

class App {

    public loader: LoaderService = new LoaderService();
    public storage: StorageService = new StorageService();

}

export const app = new App();