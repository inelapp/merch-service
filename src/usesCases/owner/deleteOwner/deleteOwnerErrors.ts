class DeleteOwnerNotFoundError extends Error {
  constructor() {
    super('Owner not found');
  }
}

export { DeleteOwnerNotFoundError };