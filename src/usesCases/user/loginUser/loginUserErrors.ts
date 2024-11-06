class UserLoginUserNotFoundError extends Error {
	constructor() {
		super('User not found');
	}
}
class UserLoginUserNotActiveError extends Error {
	constructor() {
		super('User not active');
	}
}
class UserLoginInvalidPasswordError extends Error {
	constructor() {
		super('Invalid password');
	}
}

export { UserLoginUserNotFoundError, UserLoginUserNotActiveError, UserLoginInvalidPasswordError };
