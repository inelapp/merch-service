import { Request, Response } from "express";
import { StatusCode } from "../../../types";
import { confirmUser } from "src/usesCases/user/confirmUser";
import { UserConfirmBadRequestError, UserConfirmInvalidTokenError, UserConfirmUserAlreadyActiveError, UserConfirmUserNotFoundError } from "src/usesCases/user/confirmUser/confirmUserErrors";
import { createUser } from "src/usesCases/user/createUser";
import { CreateUserRequestDto } from "src/usesCases/user/createUser/createUserRequestDto";
import { response } from "../../../utils/response";

export class UserController {
    constructor() {
        this.createUser = this.createUser.bind(this)
    }

    async createUser(req: Request, res: Response){
        try {
            const { password, status, username, email, token } = req.body as CreateUserRequestDto;
            const result = await createUser.execute({ password, status, username, email, token });

            // TODO: Añadir manejo de errores
            if(result.isErr()){
                return res.status(400).json({ error: result.error.message })
            }

            return response(res, result.value, StatusCode.CREATED)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async confirmUser(req: Request, res: Response){
        const { token } = req.params;
        const { username } = req.body;
        const result = await confirmUser.execute({ token, username });

        if(result.isErr()){
            const error = result.error;
            switch(error.constructor){
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

    // TODO: Hacer Metodo de GetUser (por id, y por username)
}