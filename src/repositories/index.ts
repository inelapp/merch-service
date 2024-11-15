import { RepairLogImplRepository } from './impl/repairLogImplRepository';
import { UserImplRepository } from './impl/userImplRepository';
import { IUserRepository } from './user.repossitory';
import { IRepairLogRepository } from './repairLog.repository';

const userRepository = new UserImplRepository();
const repairLogRepository = new RepairLogImplRepository();

export { userRepository, IUserRepository, repairLogRepository, IRepairLogRepository };
