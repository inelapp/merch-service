import { model, Schema } from "mongoose";
import { IUserDb } from "./interface";
import { ramdonString } from "../utils";
import { IRoleDb } from "./interface/role.interface";
import { IUserRoleDb } from "./interface/userRole.interface";
import { encrypt } from "src/utils/bcrypt";


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

const roleSchema = new Schema<IRoleDb>({
    name: { type: String, required: true },
    permissions: { type: [String], required: true }
}, {
    timestamps: true,
    versionKey: false
});

const userRoleSchema = new Schema<IUserRoleDb>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.pre<IUserDb>('save', async function (next) {
    if (!this.token){
        this.token = ramdonString(25);
    }
    this.password = await encrypt(this.password);
    next();
});

const UserModel = model<IUserDb>('User', userSchema, 'users');
const RoleModel = model<IRoleDb>('Role', roleSchema, 'roles');
const UserRoleModel = model<IUserRoleDb>('UserRole', userRoleSchema, 'user_role');

export { UserModel, RoleModel, UserRoleModel };