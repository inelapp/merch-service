import { GetVehicleDbResponseMap } from 'src/mappers/vehicleMap';
import { IVehicleProps, Vehicle } from '../domain/vehicle/vehicle';

export interface IVehicleFilters {
	id?: string;
	ownerId?: string;
}
export interface IVehicleRepository {
	createVehicle(request: IVehicleProps): Promise<Vehicle>;
	getVehicle(filters?: IVehicleFilters): Promise<GetVehicleDbResponseMap | null>;
	getVehicleById(id: string): Promise<GetVehicleDbResponseMap | null>;
	getVehicleByLicensePlate(licensePlate: string): Promise<GetVehicleDbResponseMap | null>;
	getAllVehicles(filters?: IVehicleFilters): Promise<GetVehicleDbResponseMap[]>;
	updateVehicle(id: string, update: Partial<IVehicleProps>): Promise<Vehicle | null>;
	deleteVehicle(id: string): Promise<boolean>;
}
