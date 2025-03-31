import { UnexpectedError } from "inel_auth_library";
import { err, ok, Result } from "neverthrow";
import { UseCase } from "../../../utils";
import { DeleteOwnerNotFoundError } from "./deleteOwnerErrors";
import { IOwnerRepository } from "../../../repositories";


type Response = Result<{ message: string }, DeleteOwnerNotFoundError | UnexpectedError>

class DeleteOwner implements UseCase<{ id: string }, Response> {
    constructor(private readonly ownerRepo: IOwnerRepository) {}
    async execute(request: { id: string; }, service?: any): Promise<Response> {
        try {
            const ownerById = await this.ownerRepo.getOwnerById(request.id);
            if (!ownerById) {
                return err(new DeleteOwnerNotFoundError());
            }
            await this.ownerRepo.deleteOwner(request.id);
            return ok({ message: "Owner deleted successfully" });
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default DeleteOwner;