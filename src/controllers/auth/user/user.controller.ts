import { Request, Response } from "express";
import { StatusCode } from "../../../types";
import { confirmUser } from "src/usesCases/user/confirmUser";
import { UserConfirmBadRequestError, UserConfirmInvalidTokenError, UserConfirmUserAlreadyActiveError, UserConfirmUserNotFoundError } from "src/usesCases/user/confirmUser/confirmUserErrors";
import { createUser } from "src/usesCases/user/createUser";
import { CreateUserRequestDto } from "src/usesCases/user/createUser/createUserRequestDto";
import { response } from "../../../utils/response";
import { UserCreateBadRequestError, UserCreateUserAlreadyExistError } from "src/usesCases/user/createUser/createUserErrors";
import { getUser } from "src/usesCases/user/getUser";
import { UserGetBadRequestError, UserGetUserNotFoundError } from "src/usesCases/user/getUser/getUserErrors";
import { encrypt } from "src/utils/bcrypt";

export class UserController {
    constructor() {
        this.createUser = this.createUser.bind(this)
    }

    async createUser(req: Request, res: Response) {
        const { password, status, username, email, token } = req.body as CreateUserRequestDto;
        const passwordHash = await encrypt(password);
        const result = await createUser.execute({ password:passwordHash, status, username, email, token });

        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case UserCreateBadRequestError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
                case UserCreateUserAlreadyExistError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name)
            }
        }
        return response(res, result.value, StatusCode.CREATED)
    }

    async confirmUser(req: Request, res: Response) {
        const { token } = req.params;
        const { username } = req.body;
        const result = await confirmUser.execute({ token, username });

        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case UserConfirmBadRequestError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name)
                case UserConfirmInvalidTokenError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name)
                case UserConfirmUserNotFoundError:
                    return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name)
                case UserConfirmUserAlreadyActiveError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name)
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name)
            }
        }
        return response(res, result.value, StatusCode.OK)
    }

    async getUser(req: Request, res: Response) {
        const {data} = req.params;
        const result = await getUser.execute({data});
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
}