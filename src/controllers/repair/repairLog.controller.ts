import { Request, Response } from 'express';
import { StatusCode } from 'src/types';
import { response } from '../../utils/response';
import { createRepairLog } from 'src/usesCases/repairLog/createRepairLog';
import { RepairLogCreateBadRequestError } from 'src/usesCases/repairLog/createRepairLog/createRepairLogErrors';
import { CreateRepairLogRequestDto } from 'src/usesCases/repairLog/createRepairLog/createRepairLogRequestDto';

export class RepairLogController {
	constructor() {
		this.createRepairLog = this.createRepairLog.bind(this);
	}

	async createRepairLog(req: Request, res: Response) {
		const repairLog = req.body as CreateRepairLogRequestDto;
		const result = await createRepairLog.execute(repairLog);

		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case RepairLogCreateBadRequestError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.CREATED);
	}
}
