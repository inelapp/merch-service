class UserCreateBadRequestError extends Error{
    constructor(message: string) {
        super(message);
    }
}

class UserCreateUserAlreadyExistError extends Error{
    constructor() {
        super('User already exist');
    }
}

export {UserCreateBadRequestError, UserCreateUserAlreadyExistError };