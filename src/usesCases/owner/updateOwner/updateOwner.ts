import { err, ok, Result } from "neverthrow";
import { UpdateOwnerResponseDto } from "./updateOwnerResponseDto";
import { UpdateOwnerBadRequestError, UpdateOwnerNotFoundError } from "./updateOwnerErrors";
import { UnexpectedError } from "inel_auth_library";
import { UseCase } from "../../../utils";
import { UpdateOwnerRequestDto } from "./updateOwnerRequestDto";
import { IOwnerRepository } from "../../../repositories";

type Response = Result<UpdateOwnerResponseDto, UpdateOwnerBadRequestError | UpdateOwnerNotFoundError | UnexpectedError>

class UpdateOwner implements UseCase<UpdateOwnerRequestDto, Response> {
    constructor(private readonly ownerRepository: IOwnerRepository){}
    async execute(request: UpdateOwnerRequestDto, service?: any): Promise<Response> {
        try {
            const { id, ...restParams } = request;
            const ownerById = await this.ownerRepository.getOwnerById(id);
            if (!ownerById) {
                return err(new UpdateOwnerNotFoundError());
            }
            const result = await this.ownerRepository.updateOwner(id, restParams);
            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default UpdateOwner;