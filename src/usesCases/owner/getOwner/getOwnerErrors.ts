class GetOwnerNotFoundError extends Error {
  constructor() {
    super('Owner not found.');
  }
}

export { GetOwnerNotFoundError };