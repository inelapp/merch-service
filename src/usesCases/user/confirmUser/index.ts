import { userRepository } from '../../../repositories';
import ConfirmUser from './confirmUser';

const confirmUser = new ConfirmUser(userRepository);

export { confirmUser };
