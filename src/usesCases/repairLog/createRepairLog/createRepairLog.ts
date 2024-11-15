import { err, ok, Result } from 'neverthrow';
import { UseCase } from 'src/utils';
import { CreateRepairLogResponseDto } from './createRepairLogResponseDto';
import { RepairLogCreateBadRequestError } from './createRepairLogErrors';
import { CreateRepairLogRequestDto } from './createRepairLogRequestDto';
import { IRepairLogRepository } from 'src/repositories';
import { RepairLog } from 'src/domain/repair/repairLog';

type Response = Result<CreateRepairLogResponseDto, RepairLogCreateBadRequestError>;

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
			const result = await this.repairLogRepository.createRepairLog(repairLogInstanceOrError.value);
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default CreateRepairLog;
