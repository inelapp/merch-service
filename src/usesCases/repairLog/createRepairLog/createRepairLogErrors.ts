class RepairLogCreateBadRequestError extends Error {
	constructor(message: string) {
		super(message);
	}
}
class RepairLogCreateVehicleInvalidObjectIdError extends Error {
	constructor() {
		super('Invalid object id');
	}
}

export { RepairLogCreateBadRequestError, RepairLogCreateVehicleInvalidObjectIdError };
