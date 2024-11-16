import { repairLogRepository } from 'src/repositories';
import UpdateRepairLog from './updateRepairLog';

const updateRepairLog = new UpdateRepairLog(repairLogRepository);

export { updateRepairLog };
