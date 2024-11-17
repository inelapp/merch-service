import { err, ok, Result } from 'neverthrow';
import { UseCase } from 'src/utils';
import { CreateRepairLogResponseDto } from './createRepairLogResponseDto';
import { RepairLogCreateBadRequestError, RepairLogCreateVehicleInvalidObjectIdError } from './createRepairLogErrors';
import { CreateRepairLogRequestDto } from './createRepairLogRequestDto';
import { IRepairLogRepository } from 'src/repositories';
import { RepairLog } from 'src/domain/repair/repairLog';
import { isValidObjectId } from 'mongoose';

type Response = Result<
	CreateRepairLogResponseDto,
	RepairLogCreateBadRequestError | RepairLogCreateVehicleInvalidObjectIdError
>;

class CreateRepairLog implements UseCase<CreateRepairLogRequestDto, Response> {
	private readonly repairLogRepository: IRepairLogRepository;

	constructor(repairLogRepo: IRepairLogRepository) {
		this.repairLogRepository = repairLogRepo;
	}

	async execute(request: CreateRepairLogRequestDto, service?: any): Promise<Response> {
		try {
			const repairLogInstanceOrError = RepairLog.create(request);
			if (repairLogInstanceOrError.isErr()) {
				return err(new RepairLogCreateBadRequestError(repairLogInstanceOrError.error));
			}
			if (!isValidObjectId(request.vehicle)) {
				return err(new RepairLogCreateVehicleInvalidObjectIdError());
			}
			const result = await this.repairLogRepository.createRepairLog(repairLogInstanceOrError.value);
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default CreateRepairLog;
