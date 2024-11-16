import { err, ok, Result } from 'neverthrow';
import { UpdateRepairLogResponseDto } from './updateRepairLogResponseDto';
import {
	RepairLogUpdateBadRequestError,
	RepairLogUpdateInvalidIdError,
	RepairLogUpdateLogNotFoundError
} from './updateRepairLogErrors';
import { UseCase } from 'src/utils';
import { UpdateRepairLogRequestDto } from './updateRepairLogRequestDto';
import { IRepairLogRepository } from 'src/repositories';
import { RepairLog } from 'src/domain/repair/repairLog';
import { isValidObjectId } from 'mongoose';

type Response = Result<
	UpdateRepairLogResponseDto,
	RepairLogUpdateBadRequestError | RepairLogUpdateLogNotFoundError | RepairLogUpdateInvalidIdError
>;

class UpdateRepairLog implements UseCase<UpdateRepairLogRequestDto, Response> {
	private readonly repairLogRepository: IRepairLogRepository;

	constructor(repairLogRepo: IRepairLogRepository) {
		this.repairLogRepository = repairLogRepo;
	}

	async execute(request: UpdateRepairLogRequestDto, service?: any): Promise<Response> {
		try {
			const repairLogInstanceOrError = RepairLog.create(request);
			if (repairLogInstanceOrError.isErr()) {
				return err(new RepairLogUpdateBadRequestError(repairLogInstanceOrError.error));
			}
			if (!isValidObjectId(repairLogInstanceOrError.value.id)) {
				return err(new RepairLogUpdateInvalidIdError());
			}
			const result = await this.repairLogRepository.updateRepairLog(repairLogInstanceOrError.value);
			if (!result) {
				return err(new RepairLogUpdateLogNotFoundError());
			}
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default UpdateRepairLog;
