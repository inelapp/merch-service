import { userRepository } from "src/repositories";
import GetUser from "./getUser";

const getUser = new GetUser(userRepository);

export {getUser}
