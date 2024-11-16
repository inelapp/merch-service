import { Result, ok, err } from 'neverthrow';
import { UseCase } from '../../../utils';
import { UpdateVehicleRequestDto } from './updateVehicleRequestDto';
import { UpdateVehicleResponseDto } from './updateVehicleResponse';
import {
	VehicleUpdateNotFoundError,
	VehicleUpdateBadRequestError,
	VehicleUpdateIdNotValidError
} from './updateVehicleErrors';
import { IVehicleRepository } from 'src/repositories/vehicle.repository';
import { isValidObjectId } from 'mongoose';

type Response = Result<UpdateVehicleResponseDto, VehicleUpdateNotFoundError | VehicleUpdateBadRequestError>;

interface UpdateVehicleUseCaseRequest {
	id: string;
	updateData: Partial<UpdateVehicleRequestDto>;
}

class UpdateVehicle implements UseCase<UpdateVehicleUseCaseRequest, Response> {
	private readonly vehicleRepository: IVehicleRepository;

	constructor(vehicleRepo: IVehicleRepository) {
		this.vehicleRepository = vehicleRepo;
	}

	async execute({ id, updateData }: UpdateVehicleUseCaseRequest): Promise<Response> {
		try {
			// Verificar si el ID tiene un formato Valido
			if (!isValidObjectId(id)) {
				return err(new VehicleUpdateIdNotValidError());
			}
			// Verificar existencia del vehículo
			const existingVehicle = await this.vehicleRepository.getVehicleById(id);
			if (!existingVehicle) {
				return err(new VehicleUpdateNotFoundError());
			}
			// Actualizar vehículo
			const updatedVehicle = await this.vehicleRepository.updateVehicle(id, updateData);
			if (!updatedVehicle) {
				return err(new VehicleUpdateBadRequestError('Failed to update vehicle'));
			}

			return ok(updatedVehicle);
		} catch (error) {
			return err(error);
		}
	}
}

export default UpdateVehicle;
