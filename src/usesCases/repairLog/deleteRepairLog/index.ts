import DeleteRepairLog from './deleteRepairLog';
import { repairLogRepository } from '../../../repositories';

const deleteRepairLog = new DeleteRepairLog(repairLogRepository);

export { deleteRepairLog };
