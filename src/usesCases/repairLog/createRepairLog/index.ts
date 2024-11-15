import { repairLogRepository } from 'src/repositories';
import CreateRepairLog from './createRepairLog';

const createRepairLog = new CreateRepairLog(repairLogRepository);

export { createRepairLog };
