import { IUserProps, User } from '../domain/auth/user';

export interface IUserRepository {
	createUser(request: IUserProps): Promise<User>;
	confirmUser(token: string, username: string): Promise<User | null>;
	getUserByUsername(username: string): Promise<Partial<User> | null>;
	getUser(request: IUserProps): Promise<User | null>;
}
