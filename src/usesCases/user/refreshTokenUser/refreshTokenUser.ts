import { err, ok, Result } from "neverthrow";
import { UseCase } from "src/utils";
import { RefreshTokenUserResponseDto } from "./refreshTokenUserResponseDto";
import { RefreshTokenUserRequestDto } from "./refreshTokenUserRequestDto";
import { JsonWebTokenError } from 'jsonwebtoken'
import { UserRefreshTokenInvalidTokenError, UserRefreshTokenExpiredTokenError, UserRefreshTokenMalformedTokenError,UserRefreshTokenRequiredSignatureError, UserRefreshTokenInvalidSignatureError, UserRefreshTokenMissingError } from "./refreshTokenUserErrors";
import { refreshToken } from "src/utils/jwt";


type Response = Result<RefreshTokenUserResponseDto, UserRefreshTokenInvalidTokenError | UserRefreshTokenMissingError | UserRefreshTokenExpiredTokenError | UserRefreshTokenMalformedTokenError | UserRefreshTokenRequiredSignatureError | UserRefreshTokenInvalidSignatureError>

class RefreshTokenUser implements UseCase<RefreshTokenUserRequestDto, Response> {

    async execute(request: RefreshTokenUserRequestDto, service?: any): Promise<Response> {
        try {
            const result = refreshToken(request.token)
            if (result instanceof JsonWebTokenError) {
                switch(result.message){
                    case 'jwt must be provided': return err(new UserRefreshTokenMissingError())
                    case 'invalid token': return err(new UserRefreshTokenInvalidTokenError())
                    case 'jwt expired': return err(new UserRefreshTokenExpiredTokenError())
                    case 'jwt malformed': return err(new UserRefreshTokenMalformedTokenError())
                    case 'jwt signature is required': return err(new UserRefreshTokenRequiredSignatureError())
                    case 'invalid signature': return err(new UserRefreshTokenInvalidSignatureError())
                }
            }
            return ok(result) as Response;
        } catch (error) {
            return err(error);
        }
    }

}

export default RefreshTokenUser;