import { ok, err, Result } from 'neverthrow';
import { validateUpdateVehicleSchema, validateVehicleSchema } from './vehicle.validation';

export interface IVehicleProps {
	make: string;
	model: string;
	year: number;
	category: string;
	licensePlate: string;
	registrationDate: Date;
	notes?: string | null;
	ownerId: string | null;
	status?: string;
}

export class Vehicle {
	id: string;

	make: string;

	model: string;

	year: number;

	category: string;

	licensePlate: string;

	registrationDate: Date;

	notes: string | null;

	ownerId: string | null;

	status: string;

	constructor(props: IVehicleProps) {
		Object.assign(this, props);
	}

	static create(props: IVehicleProps): Result<Vehicle, string> {
		const { error } = validateVehicleSchema(props);
		if (error) {
			const vehicleError = error.details.map((error) => error.message).join('. ');
			return err(vehicleError);
		}
		return ok(new Vehicle(props));
	}

	static update(props: IVehicleProps): Result<Vehicle, string> {
		const { error } = validateUpdateVehicleSchema(props);
		if (error) {
			const vehicleError = error.details.map((error) => error.message).join('. ');
			return err(vehicleError);
		}
		return ok(new Vehicle(props));
	}
}
