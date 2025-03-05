import { repairLogRepository, vehicleRepository } from '../../../repositories';
import UpdateRepairLog from './updateRepairLog';

const updateRepairLog = new UpdateRepairLog(repairLogRepository, vehicleRepository);

export { updateRepairLog };
