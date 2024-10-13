import { userRepository } from "src/repositories";
import ConfirmUser from "./confirmUser";

const confirmUser = new ConfirmUser(userRepository);

export { confirmUser }