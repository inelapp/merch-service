import { ownerRepository } from "../../../repositories";
import GetOwner from "./getOwner";

const getOwner = new GetOwner(ownerRepository);

export { getOwner };