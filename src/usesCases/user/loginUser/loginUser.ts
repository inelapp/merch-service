import { err, ok, Result } from "neverthrow";
import { LoginUserResponseDto } from "./loginUserResponseDto";
import { UseCase } from "src/utils";
import { LoginUserRequestDto } from "./loginUserRequestDto";
import { IUserRepository } from "src/repositories";
import { compare } from "src/utils/bcrypt";
import { UserLoginInvalidPasswordError, UserLoginUserNotActiveError, UserLoginUserNotFoundError } from "./loginUserErrors";
import { generateToken } from "src/utils/jwt";


type Response = Result<LoginUserResponseDto, UserLoginUserNotFoundError | UserLoginUserNotActiveError | UserLoginInvalidPasswordError>;

class LoginUser implements UseCase<LoginUserRequestDto, Response>{
    private readonly userRepository: IUserRepository;

    constructor(userRepo: IUserRepository){
        this.userRepository = userRepo;
    }

    async execute(request: LoginUserRequestDto, service?: any): Promise<Response> {
        try {
            const userExist = await this.userRepository.getUserByUsername(request.username);
            if(!userExist){
                return err(new UserLoginUserNotFoundError);
            }
            if(userExist.status !== 'active'){
                return err(new UserLoginUserNotActiveError);
                
            }
            const isPasswordValid = await compare(request.password, userExist.password!);
            if(!isPasswordValid){
                return err(new UserLoginInvalidPasswordError);
                
            }

            const token = generateToken(userExist);
            return ok(token)
        } catch (error) {
            return err(error)
        }
    }

}

export default LoginUser;