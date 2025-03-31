class CreateOwnerBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class CreateOwnerAlreadyExistsError extends Error {
    constructor() {
        super('Owner with document number already exists.');
    }
}

export { CreateOwnerBadRequestError, CreateOwnerAlreadyExistsError };