class GetOwnersBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { GetOwnersBadRequestError };