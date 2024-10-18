import { err, ok, Result } from "neverthrow";
import { CreateUserResponseDto } from "./createUserResponseDto";
import { UseCase } from "../../../utils";
import { CreateUserRequestDto } from "./createUserRequestDto";
import { User } from "src/domain/auth/user";
import { IUserRepository } from "src/repositories";
import { UserCreateBadRequestError, UserCreateUserAlreadyExistError } from "./createUserErrors";

type Response = Result<CreateUserResponseDto | UserCreateBadRequestError, UserCreateUserAlreadyExistError>

class CreateUser implements UseCase<CreateUserRequestDto, Response> {
    private readonly userRepository: IUserRepository;

    constructor(userRepo: IUserRepository){
        this.userRepository = userRepo;
    }

    async execute(request: CreateUserRequestDto, service?: any): Promise<Response> {
        try {
            const userInstanceOrError = User.create(request);

            //Invalid user
            if(userInstanceOrError.isErr()){
                return err(new UserCreateBadRequestError(userInstanceOrError.error))
            }
            const existUser = await this.userRepository.getUserByUsername(userInstanceOrError.value.username);
            
            //Usuario existe
            if(existUser){
                return err(new UserCreateUserAlreadyExistError())
            }

            const result = await this.userRepository.createUser(userInstanceOrError.value);
            return ok(result);
        } catch (error) {
            return err(error)
        }
    }
}

export default CreateUser;