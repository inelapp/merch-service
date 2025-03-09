import { UseCase } from '../../../utils';

import { err, ok, Result } from 'neverthrow';
import { GetVehicleRequestDto } from './getVehicleRequestDto';
import { GetVehicleResponseDto } from './getVehicleResponse';
import { IVehicleRepository } from '../../../repositories/vehicle.repository';
import { GetVehicleBadRequestError, GetVehicleNotFoundError } from './getVehicleErrors';

type Response = Result<GetVehicleResponseDto, GetVehicleBadRequestError | GetVehicleNotFoundError>;

class GetVehicle implements UseCase<GetVehicleRequestDto, Response> {
	private readonly vehicleRepository: IVehicleRepository;

	constructor(vehicleRepo: IVehicleRepository) {
		this.vehicleRepository = vehicleRepo;
	}

	async execute(_request: GetVehicleRequestDto, _service?: any): Promise<Response> {
		try {
			const result = await this.vehicleRepository.getVehicleById(_request.id);
			if (!result) {
				return err(new GetVehicleNotFoundError());
			}
			return ok(result);
		} catch (error) {
			return err(error);
		}
	}
}

export default GetVehicle;
