import { userRepository } from "src/repositories";
import LoginUser from "./loginUser";


const loginUser = new LoginUser(userRepository);
export{loginUser}