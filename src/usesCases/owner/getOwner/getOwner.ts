import { err, ok, Result } from "neverthrow";
import { GetOwnerNotFoundError } from "./getOwnerErrors";
import { GetOwnerResponseDto } from "./getOwnerResponseDto";
import { UseCase } from "../../../utils";
import { UnexpectedError } from "inel_auth_library";
import { GetOwnerRequestDto } from "./getOwnerRequestDto";
import { IOwnerRepository } from "../../../repositories";

type Response = Result<GetOwnerResponseDto, GetOwnerNotFoundError | UnexpectedError>

class GetOwner implements UseCase<GetOwnerRequestDto, Response> {
    constructor(private readonly ownerRepo: IOwnerRepository){}
    async execute(request: GetOwnerRequestDto, service?: any): Promise<Response> {
        try {
            const result = await this.ownerRepo.getOwnerById(request.id);
            if (!result) {
                return err(new GetOwnerNotFoundError());
            }
            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default GetOwner;