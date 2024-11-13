import { ok, err, Result } from 'neverthrow';
import { validateVehicleSchema } from './vehicle.validation';

export interface IVehicleProps {
	make: string;
	model: string;
	year: number;
	category: string;
	licensePlate: string;
	registrationDate: Date;
	notes?: string;
	ownerId: String;
}

export class Vehicle {
	id: string;

	make: string;

	model: string;

	year: number;

	category: string;

	licensePlate: string;

	registrationDate: Date;

	notes?: string;

	ownerId: String | null;

	constructor(props: IVehicleProps) {
		Object.assign(this, props);
	}

	static create(props: IVehicleProps): Result<Vehicle, String> {
		const { error } = validateVehicleSchema(props);
		if (error) {
			const vehicleError = error.details.map((error) => error.message).join('. ');
			return err(vehicleError);
		}
		return ok(new Vehicle(props));
	}
}
