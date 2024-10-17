import { IUserProps, User } from "src/domain/auth/user";
import { IUserRepository } from "../user.repossitory";
import { UserModel } from "src/db/mongo.schema";
import { UserMap } from "src/mappers/userMap";

export class UserImplRepository implements IUserRepository {
    private readonly userModel: typeof UserModel;

    constructor(){
        this.userModel = UserModel;
    }

    async createUser(request: IUserProps): Promise<User> {
        try {
            const newUser = new this.userModel(request);
            await newUser.save();
            return UserMap.fromDbToDomain(newUser);
        } catch (error) {
            throw error;
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

    async getUserByUsername(username: string): Promise<User | null> {
        try {
            const result = await this.userModel.findOne({ username })
            return result ? UserMap.fromDbToDomain(result) : null;
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