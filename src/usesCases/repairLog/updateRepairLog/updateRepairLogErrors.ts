class RepairLogUpdateBadRequestError extends Error {
	constructor(message: string) {
		super(message);
	}
}
class RepairLogUpdateLogNotFoundError extends Error {
	constructor() {
		super('Repair Log not found');
	}
}
class RepairLogUpdateInvalidIdError extends Error {
	constructor() {
		super('Invalid id');
	}
}

export { RepairLogUpdateBadRequestError, RepairLogUpdateLogNotFoundError, RepairLogUpdateInvalidIdError };
