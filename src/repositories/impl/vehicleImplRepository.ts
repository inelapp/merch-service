import { IVehicleProps, Vehicle } from 'src/domain/vehicle/vehicle';
import { IVehicleRepository } from '../vehicle.repository';
import { VehicleModel } from '../../db/mongo.schema';
import { connection } from 'mongoose';
import { VehicleMap } from 'src/mappers/vehicleMap';

export class VehicleImplRepository implements IVehicleRepository {
	private readonly vehicleModel: typeof VehicleModel;

	constructor() {
		this.vehicleModel = VehicleModel;
	}

	async getVehicleByLicensePlate(licensePlate: string): Promise<Vehicle | null> {
		try {
			const vehicle = await this.vehicleModel.findOne({ licensePlate });
			return vehicle ? VehicleMap.fromDbToDomain(vehicle) : null;
		} catch (error) {
			throw error;
		}
	}

	async getVehicleById(id: string): Promise<Vehicle | null> {
		try {
			const vehicle = await this.vehicleModel.findById(id);
			return vehicle ? VehicleMap.fromDbToDomain(vehicle) : null;
		} catch (error) {
			throw error;
		}
	}

	async getAllVehicles(): Promise<Vehicle[]> {
		try {
			const vehicles = await this.vehicleModel.find();
			return vehicles.map((vehicle) => VehicleMap.fromDbToDomain(vehicle));
		} catch (error) {
			throw new Error('Method not implemented.');
		}
	}

	async createVehicle(request: IVehicleProps): Promise<Vehicle> {
		const session = await connection.startSession();
		session.startTransaction();
		try {
			// Verificar si el número de placa ya existe
			const existingVehicle = await this.getVehicleByLicensePlate(request.licensePlate);
			if (existingVehicle) {
				throw new Error('Vehicle with this license plate already exists.');
			}

			// Crear el nuevo vehículo
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
			await newVehicle.save({ session });
			await session.commitTransaction();
			return VehicleMap.fromDbToDomain(newVehicle);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	}

	async updateVehicle(id: string, update: Partial<IVehicleProps>): Promise<Vehicle | null> {
		const session = await connection.startSession();
		session.startTransaction();
		try {
			const updatedVehicle = await this.vehicleModel.findByIdAndUpdate(id, update, { new: true, session });
			await session.commitTransaction();
			return updatedVehicle ? VehicleMap.fromDbToDomain(updatedVehicle) : null;
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	}

	async deleteVehicle(id: string): Promise<boolean> {
		const session = await connection.startSession();
		session.startTransaction();
		try {
			const result = await this.vehicleModel.findByIdAndDelete(id, { session });
			await session.commitTransaction();
			return result != null;
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	}
}
