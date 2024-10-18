import { IUserDb } from "src/db/interface";
import { User } from "src/domain/auth/user";

export class UserMap {
    static fromDbToDomain(user: IUserDb): User {
        return {
            id: user._id,
            username: user.username,
            password: user.password,
            status: user.status,
            email: user.email,
            token: user.token,
        } as User;
    }
}