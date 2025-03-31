import { ownerRepository } from "../../../repositories";
import GetOwners from "./getOwners";

const getOwners = new GetOwners(ownerRepository);

export { getOwners };