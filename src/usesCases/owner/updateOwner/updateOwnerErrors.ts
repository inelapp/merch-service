class UpdateOwnerBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class UpdateOwnerNotFoundError extends Error {
  constructor() {
    super('Owner not found.');
  }
}

export { UpdateOwnerBadRequestError, UpdateOwnerNotFoundError };