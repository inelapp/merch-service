import { err, ok, Result } from 'neverthrow';
import { ConfirmUserResponseDto } from './confirmUserResponse';
import { UseCase } from '../../../utils';
import { ConfirmUserRequestDto } from './confirmUserRequestDto';
import { IUserRepository } from '../../../repositories';
import {
	UserConfirmBadRequestError,
	UserConfirmInvalidTokenError,
	UserConfirmUserAlreadyActiveError,
	UserConfirmUserNotFoundError
} from './confirmUserErrors';

type Response = Result<
	ConfirmUserResponseDto,
	| UserConfirmBadRequestError
	| UserConfirmInvalidTokenError
	| UserConfirmUserAlreadyActiveError
	| UserConfirmUserNotFoundError
>;

class ConfirmUser implements UseCase<ConfirmUserRequestDto, Response> {
	private readonly userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async execute(request: ConfirmUserRequestDto, service?: any): Promise<Response> {
		try {
			const userExist = await this.userRepository.getUserByUsername(request.username);
			//Usuario existe
			if (!userExist) {
				return err(new UserConfirmUserNotFoundError());
			}
			//Usuario ya esta activo
			if (userExist.status === 'active') {
				return err(new UserConfirmUserAlreadyActiveError());
			}
			const result = await this.userRepository.confirmUser(request.token, userExist.username!);
			//Token no valido
			if (!result) {
				return err(new UserConfirmInvalidTokenError());
			}

			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default ConfirmUser;
