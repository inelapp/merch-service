import { IUserProps, User } from "src/domain/auth/user";

export interface IUserRepository {
    createUser(request: IUserProps): Promise<User>;
    confirmUser(token: string, username: string): Promise<User | null>;
    getUserByUsername(username: string): Promise<User | null>;
    getUser(request: IUserProps): Promise<User | null>;
}