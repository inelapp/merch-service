import { ownerRepository } from "../../../repositories";
import DeleteOwner from "./deleteOwner";

const deleteOwner = new DeleteOwner(ownerRepository)

export { deleteOwner };