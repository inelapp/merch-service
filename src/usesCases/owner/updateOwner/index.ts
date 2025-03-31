import { ownerRepository } from "../../../repositories";
import UpdateOwner from "./updateOwner";

const updateOwner = new UpdateOwner(ownerRepository);

export { updateOwner };