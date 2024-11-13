import { Schema } from 'mongoose';

export interface IVehicleDb {
	_id: string | Schema.Types.ObjectId;
	make: string;
	model: string;
	year: Date;
	category: string;
	licensePlate: string;
	registrationDate: Date;
	notes: string;
	ownerId: String | Schema.Types.ObjectId | null;
}
