import { err, ok, Result } from 'neverthrow';
import { GetUserResponseDto } from './getUserResponseDto';
import { UseCase } from '../../../utils';
import { GetUserRequestDto } from './getUserRequestDto';
import { IUserRepository } from '../../../repositories';
import { isValidObjectId } from 'mongoose';
import { UserGetBadRequestError, UserGetUserNotFoundError } from './getUserErrors';

type Response = Result<GetUserResponseDto, UserGetBadRequestError | UserGetUserNotFoundError>;

class GetUser implements UseCase<GetUserRequestDto, Response> {
	private readonly userRespository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRespository = userRepository;
	}

	async execute(request?: GetUserRequestDto, service?: any): Promise<Response> {
		try {
			console.log('usecase: ' + request);
			if (!request) {
				return err(new UserGetBadRequestError('No data sent'));
			}

			const user: any = {};

			if (isValidObjectId(request.data)) {
				user._id = request.data;
			} else {
				user.username = request.data;
			}

			const result = await this.userRespository.getUser(user);

			if (!result) {
				return err(new UserGetUserNotFoundError());
			}

			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default GetUser;
