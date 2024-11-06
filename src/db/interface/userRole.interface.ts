import { Schema } from 'mongoose';

export interface IUserRoleDb {
	_id: string;
	userId: Schema.Types.ObjectId;
	roleId: Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}
