import { RepairLogImplRepository } from './impl/repairLogImplRepository';
import { UserImplRepository } from './impl/userImplRepository';
import { VehicleImplRepository } from './impl/vehicleImplRepository';
import { IUserRepository } from './user.repossitory';
import { IRepairLogRepository } from './repairLog.repository';
import { OwnerImplRepository } from './impl/ownerImplRepository';
import { IOwnerRepository } from './owner.repository';

const userRepository = new UserImplRepository();
const vehicleRepository = new VehicleImplRepository();
const repairLogRepository = new RepairLogImplRepository();
const ownerRepository = new OwnerImplRepository();

export { userRepository, IUserRepository, vehicleRepository, repairLogRepository, IRepairLogRepository, ownerRepository, IOwnerRepository };
