import { IRepairLogProps, RepairLog } from 'src/domain/repair/repairLog';
import { IRepairLogRepository } from '../repairLog.repository';
import { RepairLogModel } from 'src/db/mongo.schema';
import { RepairLogMap } from 'src/mappers/repairLogMap';

export class RepairLogImplRepository implements IRepairLogRepository {
	private readonly repairLogModel: typeof RepairLogModel;

	constructor() {
		this.repairLogModel = RepairLogModel;
	}

	async createRepairLog(request: IRepairLogProps): Promise<RepairLog> {
		try {
			const {
				vehicle,
				repairNumber,
				technicalReview,
				observation,
				subTotal,
				discount,
				total,
				paymentType,
				repairStatus
			} = request;

			const newRepairLog = new this.repairLogModel({
				vehicle,
				repairNumber,
				technicalReview,
				observation,
				subTotal,
				discount,
				total,
				paymentType,
				repairStatus
			});
			await newRepairLog.save();
			return RepairLogMap.fromDbToDomain(newRepairLog);
		} catch (error) {
			throw error;
		}
	}

	async getRepairLog(page: number, limit: number, filters?: any): Promise<RepairLog[]> {
		try {
			console.log(page, limit, filters);
			const repairLogList = await this.repairLogModel
				.find(filters)
				.skip((page - 1) * limit)
				.limit(limit);
			return repairLogList.map((e) => RepairLogMap.fromDbToDomain(e));
		} catch (error) {
			throw error;
		}
	}
}
