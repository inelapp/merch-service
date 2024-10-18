class UserGetBadRequestError extends Error{
    constructor(message: string) {
        super(message);
    }
}

class UserGetUserNotFoundError extends Error{
    constructor() {
        super('User not found');
    }
}

export{UserGetBadRequestError, UserGetUserNotFoundError}