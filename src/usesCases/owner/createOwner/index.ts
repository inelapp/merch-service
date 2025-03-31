import { ownerRepository } from "../../../repositories";
import CreateOwner from "./createOwner";

const createOwner = new CreateOwner(ownerRepository);

export { createOwner };