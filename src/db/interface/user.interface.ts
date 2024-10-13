import { Schema } from "mongoose";

export interface IUserDb {
    _id: string | Schema.Types.ObjectId;
    username: string;
    password: string;
    email?: string;
    status: string;
    token?: string | null;
    createdAt: Date;
    updatedAt: Date;
}