import { Request, Response } from 'express';
import { StatusCode } from '../../types';
import { response } from '../../utils/response';
import { createRepairLog } from '../../usesCases/repairLog/createRepairLog';
import {
	RepairLogCreateBadRequestError,
	RepairLogCreateVehicleInvalidObjectIdError,
	RepairLogCreateVehicleNotFoundError
} from '../../usesCases/repairLog/createRepairLog/createRepairLogErrors';
import { CreateRepairLogRequestDto } from '../../usesCases/repairLog/createRepairLog/createRepairLogRequestDto';
import { getRepairLog } from '../../usesCases/repairLog/getRepairLog';
import {
	RepairLogGetLimitConvertionError,
	RepairLogGetPageConvertionError
} from '../../usesCases/repairLog/getRepairLog/getRepairLogErrors';
import { UpdateRepairLogRequestDto } from '../../usesCases/repairLog/updateRepairLog/updateRepairLogRequestDto';
import { updateRepairLog } from '../../usesCases/repairLog/updateRepairLog';
import {
	RepairLogUpdateBadRequestError,
	RepairLogUpdateInvalidIdError,
	RepairLogUpdateLogNotFoundError,
	RepairLogUpdateVehicleNotFoundError
} from '../../usesCases/repairLog/updateRepairLog/updateRepairLogErrors';
import { deleteRepairLog } from '../../usesCases/repairLog/deleteRepairLog';
import {
	RepairLogDeleteInvalidIdError,
	RepairLogDeleteLogNotFoundError
} from '../../usesCases/repairLog/deleteRepairLog/deleteRepairLogErrors';

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
				case RepairLogCreateVehicleInvalidObjectIdError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case RepairLogCreateVehicleNotFoundError:
					return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.CREATED);
	}

	async getRepairLog(req: Request, res: Response) {
		const page = req.query.page as string | undefined;
		const limit = req.query.limit as string | undefined;
		const paymentType = req.query.paymentType as string | undefined;
		const repairStatus = req.query.repairStatus as string | undefined;
		const result = await getRepairLog.execute({ page, limit, filters: { paymentType, repairStatus } });

		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case RepairLogGetPageConvertionError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case RepairLogGetLimitConvertionError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.OK);
	}

	async updateRepairLog(req: Request, res: Response) {
		const repairLog = req.body as UpdateRepairLogRequestDto;
		const result = await updateRepairLog.execute(repairLog);

		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case RepairLogUpdateBadRequestError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case RepairLogUpdateInvalidIdError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case RepairLogUpdateLogNotFoundError:
					return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
				case RepairLogUpdateVehicleNotFoundError:
					return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.OK);
	}

	async deleteRepairLog(req: Request, res: Response) {
		const { id } = req.params;
		const result = await deleteRepairLog.execute({ id });

		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case RepairLogDeleteInvalidIdError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				case RepairLogDeleteLogNotFoundError:
					return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}
		return response(res, result.value, StatusCode.OK);
	}
}
