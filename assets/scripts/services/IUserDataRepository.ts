import { UserData } from "db://assets/scripts/services/StorageService";

export interface IUserDataRepository {

    loadUserData(): Promise<UserData>;
    saveUserData(data: UserData): Promise<void>;

}