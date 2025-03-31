import { err, ok, Result } from "neverthrow";
import { CreateOwnerResponseDto } from "./createOwnerResponseDto";
import { CreateOwnerAlreadyExistsError, CreateOwnerBadRequestError } from "./createOwnerErrors";
import { UnexpectedError } from "inel_auth_library";
import { UseCase } from "../../../utils";
import { CreateOwnerRequestDto } from "./createOwnerRequestDto";
import { IOwnerRepository } from "../../../repositories";
import { Owner } from "../../../domain/owner/owner";

type Response = Result<CreateOwnerResponseDto, CreateOwnerBadRequestError | CreateOwnerAlreadyExistsError | UnexpectedError>

class CreateOwner implements UseCase<CreateOwnerRequestDto, Response> {
    constructor(private readonly ownerRepository: IOwnerRepository){}
    async execute(request: CreateOwnerRequestDto, service?: any): Promise<Response> {
        try {
            const ownerOrError = Owner.create(request);
            if (ownerOrError.isErr()) {
                return err(new CreateOwnerBadRequestError(ownerOrError.error));
            }
            const owner = ownerOrError.value;
            const ownerByDocumentNumber = await this.ownerRepository.getOwner({ documentNumber: owner.documentNumber });
            if (ownerByDocumentNumber) {
                return err(new CreateOwnerAlreadyExistsError());
            }
            const result = await this.ownerRepository.createOwner(owner);
            return ok(result);
        } catch (error) {
            throw new UnexpectedError(error);
        }
    }
}

export default CreateOwner;