import { UserImplRepository } from "./impl/userImplRepository";
import { IUserRepository } from './user.repossitory';

const userRepository = new UserImplRepository();

export {
    userRepository,
    IUserRepository
}