import { model, Schema } from "mongoose";
import { IUserDb } from "./interface";
import { ramdonString } from "../utils";


const userSchema = new Schema<IUserDb>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    status: { type: String, required: true, default: 'pending' },
    token: { type: String }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre<IUserDb>('save', function (next) {
    if (!this.token){
        this.token = ramdonString(25);
    }
    next();
});

const UserModel = model<IUserDb>('User', userSchema, 'users');

export { UserModel };