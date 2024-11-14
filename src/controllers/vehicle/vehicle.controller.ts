import { Request, Response } from 'express';
import { StatusCode } from 'src/types';
import { createVehicle } from 'src/usesCases/vehicle/createVehicle';
import { VehicleCreateBadRequestError } from 'src/usesCases/vehicle/createVehicle/createVehicleErrors';

import { CreateVehicleRequestDto } from 'src/usesCases/vehicle/createVehicle/createVehicleRequestDto';
import { response } from 'src/utils/response';

export class VehicleController {
	constructor() {
		this.createVehicle = this.createVehicle.bind(this);
	}

	async createVehicle(req: Request, res: Response) {
		const { make, model, year, category, licensePlate, registrationDate, notes, ownerId } =
			req.body as CreateVehicleRequestDto;
		// return res.json({ make, model, year, category, licensePlate, registrationDate, notes, ownerId })
		const result = await createVehicle.execute({
			make,
			model,
			year,
			category,
			licensePlate,
			registrationDate,
			notes,
			ownerId
		});

		if (result.isErr()) {
			const error = result.error;
			switch (error.constructor) {
				case VehicleCreateBadRequestError:
					return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
				default:
					return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
			}
		}

		return response(res, result.value, StatusCode.CREATED);
	}
}
