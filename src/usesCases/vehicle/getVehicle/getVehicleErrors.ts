export class GetVehicleBadRequestError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class GetVehicleNotFoundError extends Error {
	constructor() {
		super('Vehicle not found.');
	}
}