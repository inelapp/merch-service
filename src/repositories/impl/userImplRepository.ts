import { IUserProps, User } from "src/domain/auth/user";
import { IUserRepository } from "../user.repossitory";
import { UserModel, UserRoleModel } from "src/db/mongo.schema";
import { IUserRoleDb, UserMap } from "src/mappers/userMap";
import { ClientSession, connection } from "mongoose";

export class UserImplRepository implements IUserRepository {
    private readonly userModel: typeof UserModel;
    private readonly userRoleModel: typeof UserRoleModel;

    constructor(){
        this.userModel = UserModel;
        this.userRoleModel = UserRoleModel;
    }

    async createUser(request: IUserProps): Promise<User> {
        const session = await connection.startSession();
        try {
            return await session.withTransaction(async (session: ClientSession) => {
                const { username, password, status, email, roles, token } = request;
                const newUser = new this.userModel({ username, password, status, email, token });
                await newUser.save({ session });
                const userRoles = roles?.map((role: string) => {
                    return { userId: newUser._id, roleId: role }
                });
                await this.userRoleModel.insertMany(userRoles, { session });
                await session.commitTransaction();

                return UserMap.fromDbToDomain(newUser);
            })
        } catch (error) {
            session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async confirmUser(token: string, username: string): Promise<User | null> {
        try {
            const user = await this.userModel.findOne({
                token,
                username
            })
            if(!user) {
                return null;
            }
            await this.userModel.findByIdAndUpdate(user._id, { status: 'active', token: null });
            const newUser = await this.userModel.findById(user._id);
            return UserMap.fromDbToDomain(newUser!);
        } catch (error) {
            throw error;
        }
    }

    async getUserByUsername(username: string): Promise<Partial<User> | null> {
        try {
            const user = await this.userModel.findOne({ username })
            if(!user) return null
            const result = await this.userRoleModel.find({userId:user?.id}).populate("userId").populate("roleId")
            return result ? UserMap.fromDbToDomainDetail(result as unknown as IUserRoleDb[]) : null;
        } catch (error) {
            throw error;
        }
    }
    async getUser(request: IUserProps): Promise<User | null>{
        try{
            const result = await this.userModel.findOne(request);
            return result ? UserMap.fromDbToDomain(result) : null;
        }catch(error){
            throw error;
        }
    }
}