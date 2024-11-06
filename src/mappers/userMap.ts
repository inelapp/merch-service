import { Schema } from 'mongoose';
import { IUserDb } from '../db/interface';
import { User } from '../domain/auth/user';
export interface IUserRoleDb {
	_id: string | Schema.Types.ObjectId;
	userId: UserID;
	roleId: RoleID;
	createdAt: Date;
	updatedAt: Date;
}

export interface RoleID {
	_id: string | Schema.Types.ObjectId;
	name: string;
	permissions: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface UserID {
	_id: string | Schema.Types.ObjectId;
	username: string;
	password: string;
	email: string;
	status: string;
	token: null;
	createdAt: Date;
	updatedAt: Date;
}

export class UserMap {
	static fromDbToDomain(user: IUserDb): User {
		return {
			id: user._id,
			username: user.username,
			password: user.password,
			status: user.status,
			email: user.email,
			token: user.token
		} as User;
	}

	static fromDbToDomainDetail(user: IUserRoleDb[]): Partial<User> {
		return {
			id: user[0].userId._id as string,
			username: user[0].userId.username,
			password: user[0].userId.password,
			status: user[0].userId.status,
			email: user[0].userId.email,
			roles: user.map((role) => role.roleId.name)
		} as User;
	}
}
