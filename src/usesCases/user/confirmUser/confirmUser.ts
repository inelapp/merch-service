import { err, ok, Result } from "neverthrow";
import { ConfirmUserResponseDto } from "./confirmUserResponse";
import { UseCase } from "src/utils";
import { ConfirmUserRequestDto } from "./confirmUserRequestDto";
import { IUserRepository } from "src/repositories";
import { UserConfirmBadRequestError, UserConfirmInvalidTokenError, UserConfirmUserAlreadyActiveError, UserConfirmUserNotFoundError } from "./confirmUserErrors";

type Response = Result<ConfirmUserResponseDto, UserConfirmBadRequestError | UserConfirmInvalidTokenError | UserConfirmUserAlreadyActiveError | UserConfirmUserNotFoundError>;

class ConfirmUser implements UseCase<ConfirmUserRequestDto, Response> {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(request: ConfirmUserRequestDto, service?: any): Promise<Response> {
        try {
            const userExist = await this.userRepository.getUserByUsername(request.username);
            if(!userExist){
                return err(new UserConfirmUserNotFoundError())
            }
            if(userExist.status === 'active'){
                return err(new UserConfirmUserAlreadyActiveError())
            }
            const result = await this.userRepository.confirmUser(request.token, userExist.username);
            if(!result){
                return err(new UserConfirmInvalidTokenError())
            }

            return ok(result);
        } catch (error) {
            return err(error)
        }
    }
}

export default ConfirmUser;