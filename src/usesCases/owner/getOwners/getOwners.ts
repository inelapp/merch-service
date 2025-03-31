import { err, ok, Result } from "neverthrow";
import { GetOwnersBadRequestError } from "./getOwnersErrors";
import { UnexpectedError } from "inel_auth_library";
import { GetOwnersResponseDto } from "./getOwnersResponseDto";
import { UseCase } from "../../../utils";
import { GetOwnersRequestDto } from "./getOwnersRequestDto";
import { IOwnerRepository } from "../../../repositories";

type Response = Result<GetOwnersResponseDto, GetOwnersBadRequestError | UnexpectedError>

class GetOwners implements UseCase<GetOwnersRequestDto, Response> {
    constructor(private readonly ownerRepository: IOwnerRepository) {}
    async execute(request: GetOwnersRequestDto, service?: any): Promise<Response> {
        try {
            const result = await this.ownerRepository.getOwners(request);
            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default GetOwners;