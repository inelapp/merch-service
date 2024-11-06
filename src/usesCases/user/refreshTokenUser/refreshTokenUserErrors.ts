class UserRefreshTokenMissingError extends Error {
	constructor() {
		super('Token not provided');
	}
}
class UserRefreshTokenInvalidTokenError extends Error {
	constructor() {
		super('Invalid token');
	}
}

class UserRefreshTokenExpiredTokenError extends Error {
	constructor() {
		super('Token expired');
	}
}
class UserRefreshTokenMalformedTokenError extends Error {
	constructor() {
		super('Token malformed');
	}
}
class UserRefreshTokenRequiredSignatureError extends Error {
	constructor() {
		super('Token signature is required');
	}
}
class UserRefreshTokenInvalidSignatureError extends Error {
	constructor() {
		super('Invalid token signature');
	}
}

export {
	UserRefreshTokenMissingError,
	UserRefreshTokenInvalidTokenError,
	UserRefreshTokenExpiredTokenError,
	UserRefreshTokenMalformedTokenError,
	UserRefreshTokenRequiredSignatureError,
	UserRefreshTokenInvalidSignatureError
};
