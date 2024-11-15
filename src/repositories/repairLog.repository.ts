import { IRepairLogProps, RepairLog } from 'src/domain/repair/repairLog';

export interface IRepairLogRepository {
	createRepairLog(request: IRepairLogProps): Promise<RepairLog>;
}
