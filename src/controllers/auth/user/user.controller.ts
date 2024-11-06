import { Request, Response } from 'express';
import { StatusCode } from '../../../types';
import { confirmUser } from '../../../usesCases/user/confirmUser';
import {
	UserConfirmBadRequestError,
	UserConfirmInvalidTokenError,
	UserConfirmUserAlreadyActiveError,
	UserConfirmUserNotFoundError
} from '../../../usesCases/user/confirmUser/confirmUserErrors';
import { createUser } from '../../../usesCases/user/createUser';
import { CreateUserRequestDto } from '../../../usesCases/user/createUser/createUserRequestDto';
import { response } from '../../../utils/response';
import {
	UserCreateBadRequestError,
	UserCreateUserAlreadyExistError
} from '../../../usesCases/user/createUser/createUserErrors';
import { getUser } from '../../../usesCases/user/getUser';
import { UserGetBadRequestError, UserGetUserNotFoundError } from '../../../usesCases/user/getUser/getUserErrors';
import { loginUser } from '../../../usesCases/user/loginUser';
import {
	UserLoginInvalidPasswordError,
	UserLoginUserNotActiveError,
	UserLoginUserNotFoundError
} from '../../../usesCases/user/loginUser/loginUserErrors';
import { refreshTokenUser } from "src/usesCases/user/refreshTokenUser";
import { UserRefreshTokenExpiredTokenError, 
        UserRefreshTokenInvalidSignatureError, 
        UserRefreshTokenInvalidTokenError, 
        UserRefreshTokenMalformedTokenError, 
        UserRefreshTokenMissingError, 
        UserRefreshTokenRequiredSignatureError 
    } from "src/usesCases/user/refreshTokenUser/refreshTokenUserErrors";

export class UserController {
	constructor() {
		this.createUser = this.createUser.bind(this);
	}

	async createUser(req: Request, res: Response) {
		const { password, status, username, email, token, roles } = req.body as CreateUserRequestDto;
		const result = await createUser.execute({ password, status, username, email, token, roles });

		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case UserCreateBadRequestError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case UserCreateUserAlreadyExistError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.CREATED);
	}

	async confirmUser(req: Request, res: Response) {
		const { token } = req.params;
		const { username } = req.body;
		const result = await confirmUser.execute({ token, username });

		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case UserConfirmBadRequestError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case UserConfirmInvalidTokenError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case UserConfirmUserNotFoundError:
					return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
				case UserConfirmUserAlreadyActiveError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.OK);
	}

	async getUser(req: Request, res: Response) {
		const { data } = req.params;
		const result = await getUser.execute({ data });
		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case UserGetBadRequestError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case UserGetUserNotFoundError:
					return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.OK);
	}

	async login(req: Request, res: Response) {
		const { username, password } = req.body;
		const result = await loginUser.execute({ username, password });

		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case UserLoginUserNotFoundError:
					return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
				case UserLoginUserNotActiveError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case UserLoginInvalidPasswordError:
					return response(res, error.message, StatusCode.UNAUTHORIZED, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, StatusCode.OK)
    }

    async refreshToken(req: Request, res: Response){
        const token = req.headers.authorization?.split(' ')[1] as string;
        const result = await refreshTokenUser.execute({token});

        if(result.isErr()){
            const error = result.error;
            switch (error.constructor) {
                case UserRefreshTokenMissingError:
                    return response(res, error.message, StatusCode.UNAUTHORIZED, error.constructor.name)
                case UserRefreshTokenInvalidTokenError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name)
                case UserRefreshTokenExpiredTokenError:
                    return response(res, error.message, StatusCode.UNAUTHORIZED, error.constructor.name)
                case UserRefreshTokenMalformedTokenError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name)
                case UserRefreshTokenRequiredSignatureError:
                    return response(res, error.message, StatusCode.UNAUTHORIZED, error.constructor.name)
                case UserRefreshTokenInvalidSignatureError:
                    return response(res, error.message, StatusCode.UNAUTHORIZED, error.constructor.name)
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name)
			}  
		}
		return response(res, result.value, StatusCode.OK);
	}
}
