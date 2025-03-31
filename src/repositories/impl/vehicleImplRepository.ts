import { IVehicleProps, Vehicle } from '../../domain/vehicle/vehicle';
import { IVehicleFilters, IVehicleRepository } from '../vehicle.repository';
import { VehicleModel } from '../../db/mongo.schema';
import { GetVehicleDbResponseMap, IVehicleDbResponse, VehicleMap } from '../../mappers/vehicleMap';
import { VehicleUpdateLicensePlateAlreadyAssigned } from '../../usesCases/vehicle/updateVehicle/updateVehicleErrors';

export class VehicleImplRepository implements IVehicleRepository {
	private readonly vehicleModel: typeof VehicleModel;

	constructor() {
		this.vehicleModel = VehicleModel;
	}

	async getVehicle(filters?: IVehicleFilters): Promise<GetVehicleDbResponseMap | null> {
		try {
			const result = await this.vehicleModel.findOne(filters).populate('ownerId');
			if (!result) {
				return null;
			}
			return VehicleMap.fromDbToDomainDetail(result as IVehicleDbResponse);
		} catch (error) {
			throw error;
		}
	}

	async getVehicleByLicensePlate(licensePlate: string): Promise<GetVehicleDbResponseMap | null> {
		try {
			const vehicle = await this.vehicleModel.findOne({ licensePlate }).populate('ownerId');
			return vehicle ? VehicleMap.fromDbToDomainDetail(vehicle as IVehicleDbResponse) : null;
		} catch (error) {
			throw error;
		}
	}

	async getVehicleById(id: string): Promise<GetVehicleDbResponseMap | null> {
		try {
			const vehicle = await this.vehicleModel.findById(id).populate('ownerId');
			return vehicle ? VehicleMap.fromDbToDomainDetail(vehicle as IVehicleDbResponse) : null;
		} catch (error) {
			throw error;
		}
	}

	async getAllVehicles(filters: IVehicleFilters): Promise<GetVehicleDbResponseMap[]> {
		try {
			const vehicles = await this.vehicleModel.find(filters).populate('ownerId');
			return vehicles.map((vehicle) => VehicleMap.fromDbToDomainDetail(vehicle as IVehicleDbResponse));
		} catch (error) {
			throw error;
		}
	}

	async createVehicle(request: IVehicleProps): Promise<Vehicle> {
		try {
			const { make, model, year, category, licensePlate, registrationDate, notes, ownerId } = request;
			const newVehicle = new this.vehicleModel({
				make,
				model,
				year,
				category,
				licensePlate,
				registrationDate,
				notes,
				ownerId
			});
			await newVehicle.save();
			return VehicleMap.fromDbToDomain(newVehicle);
		} catch (error) {
			throw error;
		}
	}

	async updateVehicle(id: string, update: Partial<IVehicleProps>): Promise<Vehicle | null> {
		try {
			// Verifica si se intenta actualizar el `licensePlate`
			if (update.licensePlate) {
				const existingVehicle = await this.vehicleModel.findOne({
					licensePlate: update.licensePlate,
					_id: { $ne: id } // Excluir el vehículo actual
				});
				if (existingVehicle) {
					throw new VehicleUpdateLicensePlateAlreadyAssigned();
				}
			}
			// Realiza la actualización
			const updatedVehicle = await this.vehicleModel.findByIdAndUpdate(id, update, { new: true });
			return updatedVehicle ? VehicleMap.fromDbToDomain(updatedVehicle) : null;
		} catch (error) {
			if (error.message.includes('license plate')) {
				throw new VehicleUpdateLicensePlateAlreadyAssigned(); // Error personalizado
			}
			throw error;
		}
	}

	async deleteVehicle(id: string): Promise<boolean> {
		try {
			const result = await this.vehicleModel.findByIdAndDelete(id);
			return result != null;
		} catch (error) {
			throw error;
		}
	}
}
