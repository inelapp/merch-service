import { Schema } from "mongoose";

export interface IRoleDb {
    _id: string | Schema.Types.ObjectId;
    name: string;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
}