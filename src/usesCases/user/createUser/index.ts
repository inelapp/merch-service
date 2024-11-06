import { userRepository } from '../../../repositories';
import CreateUser from './createUser';

const createUser = new CreateUser(userRepository);

export { createUser };
