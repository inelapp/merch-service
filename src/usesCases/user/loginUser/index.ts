import { userRepository } from '../../../repositories';
import LoginUser from './loginUser';

const loginUser = new LoginUser(userRepository);
export { loginUser };
