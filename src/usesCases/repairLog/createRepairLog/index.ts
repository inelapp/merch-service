import { repairLogRepository, vehicleRepository } from '../../../repositories';
import CreateRepairLog from './createRepairLog';

const createRepairLog = new CreateRepairLog(repairLogRepository, vehicleRepository);

export { createRepairLog };
