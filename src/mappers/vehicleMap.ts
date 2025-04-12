import { Owner } from '../domain/owner/owner';
import { IVehicleDb } from '../db/interface/vehicle.interface';
import { Vehicle } from '../domain/vehicle/vehicle';
import { IOwnerDb } from 'src/db/interface';

export interface GetVehicleDbResponseMap {
	id: string;
	make: string;
	model: string;
	year: number;
	category: string;
	licensePlate: string;
	registrationDate: Date;
	notes?: string;
	status: string;
	owner: Partial<Owner> | null;
}

export type IVehicleDbResponse = Omit<IVehicleDb, 'ownerId'> & { ownerId: Partial<IOwnerDb> } 
export class VehicleMap {
	static fromDbToDomain(vehicle: IVehicleDb): Vehicle {
		return {
			id: vehicle._id,
			make: vehicle.make,
			model: vehicle.model,
			year: vehicle.year,
			category: vehicle.category,
			licensePlate: vehicle.licensePlate,
			registrationDate: vehicle.registrationDate,
			notes: vehicle.notes,
			ownerId: vehicle.ownerId,
			status: vehicle.status
		} as Vehicle;
	}

	static fromDbToDomainDetail(vehicle: IVehicleDbResponse): GetVehicleDbResponseMap {
		return {
			id: vehicle._id?.toString(),
			make: vehicle.make,
			model: vehicle.model,
			year: vehicle.year,
			category: vehicle.category,
			licensePlate: vehicle.licensePlate,
			registrationDate: vehicle.registrationDate,
			notes: vehicle.notes || '',
			owner: vehicle.ownerId ? {
				id: vehicle.ownerId?._id,
				name: vehicle.ownerId?.name || '',
				middleName: vehicle.ownerId?.middleName || '',
				lastName: vehicle.ownerId?.lastName || '',
				secondLastName: vehicle.ownerId?.secondLastName || '',
				documentType: vehicle.ownerId?.documentType?.toUpperCase() || '',
				documentNumber: vehicle.ownerId?.documentNumber || '',
				phoneNumber: vehicle.ownerId?.phoneNumber || '',
				email: vehicle.ownerId?.email || ''
			} : null,
			status: vehicle.status
		}
	}
}
