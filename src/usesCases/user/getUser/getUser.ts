import { err, ok, Result } from "neverthrow";
import { GetUserResponseDto } from "./getUserResponseDto";
import { UseCase } from "src/utils";
import { GetUserRequestDto } from "./getUserRequestDto";
import { IUserRepository } from "src/repositories";
import { isValidObjectId } from "mongoose";
import { UserGetBadRequestError, UserGetUserNotFoundError } from "./getUserErrors";


type Response = Result<GetUserResponseDto, UserGetBadRequestError | UserGetUserNotFoundError>;

class GetUser implements UseCase<GetUserRequestDto, Response> {

    private readonly userRespository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRespository = userRepository;
    }

    async execute(request?: GetUserRequestDto, service?: any): Promise<Response> {
        try {
            console.log("usecase: "+request)
            if (!request || (!request.id && !request.username) ) {
                return err(new UserGetBadRequestError("No data sent"))
            }

            const user: any = {};

            if (request.id && isValidObjectId(request.id)) {
                user._id = request.id;
            }

            if (request.username) {
                user.username = request.username;
            }

            const result = await this.userRespository.getUser(user);

            if (!result) {
                return err(new UserGetUserNotFoundError())
            }

            return ok(result);

        } catch (error) {
            return err(error)
        }
    }
}

export default GetUser;
