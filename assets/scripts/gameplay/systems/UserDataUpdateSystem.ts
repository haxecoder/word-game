import { System } from "db://assets/scripts/gameplay/systems/System";
import { IUserDataRepository } from "db://assets/scripts/services/IUserDataRepository";

export class UserDataUpdateSystem extends System {

    constructor(private readonly user: IUserDataRepository) {
        super();

        this.listen("word.accept", this.saveUserData);
    }

    private async saveUserData() {
        await this.user.saveUserData(this.model.user);
    }

}