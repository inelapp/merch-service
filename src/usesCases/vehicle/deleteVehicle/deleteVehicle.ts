import { err, ok, Result } from 'neverthrow';
import { UseCase } from 'src/utils';
import { VehicleDeleteBadRequestError, VehicleNotFoundError } from './deleteVehicleErrors';
import { DeleteVehicleResponseDto } from './deleteVehicleResponseDto';
import { DeleteVehicleRequestDto } from './deleteVehicleResquestDto';
import { IVehicleRepository } from 'src/repositories/vehicle.repository';

type Response = Result<DeleteVehicleResponseDto, VehicleDeleteBadRequestError | VehicleNotFoundError>;

class DeleteVehicle implements UseCase<DeleteVehicleRequestDto, Response> {
	private readonly vehicleRepository: IVehicleRepository;

	constructor(vechicleRepo: IVehicleRepository) {
		this.vehicleRepository = vechicleRepo;
	}

	async execute(request: DeleteVehicleRequestDto, service?: any): Promise<Response> {
		try {
			const vehicleExist = await this.vehicleRepository.getVehicleById(request.id);
			// si el vehiculo no existe
			if (!vehicleExist) {
				return err(new VehicleNotFoundError());
			}
			//Eliminando Vehiculo
			await this.vehicleRepository.deleteVehicle(request.id);
			return ok({ message: 'Vehicle deleted successfully' });
		} catch (error) {
			return err(error);
		}
	}
}

export default DeleteVehicle;
