import { UserImplRepository } from './impl/userImplRepository';
import { VehicleImplRepository } from './impl/vehicleImplRepository';
import { IUserRepository } from './user.repossitory';

const userRepository = new UserImplRepository();
const vehicleRepository = new VehicleImplRepository();

export { userRepository, IUserRepository, vehicleRepository };
