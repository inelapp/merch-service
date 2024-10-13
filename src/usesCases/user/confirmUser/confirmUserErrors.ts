class UserConfirmBadRequestError extends Error{
    constructor(message: string) {
        super(message);
    }
}

class UserConfirmInvalidTokenError extends Error{
    constructor() {
        super('Invalid token');
    }
}

class UserConfirmUserNotFoundError extends Error{
    constructor() {
        super('User not found');
    }
}

class UserConfirmUserAlreadyActiveError extends Error{
    constructor() {
        super('User already active');
    }
}

export { UserConfirmBadRequestError, UserConfirmInvalidTokenError, UserConfirmUserNotFoundError, UserConfirmUserAlreadyActiveError };