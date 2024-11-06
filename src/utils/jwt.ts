import jwt, { Secret, JwtPayload, JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { User } from '../domain/auth/user';

const SECRET_KEY: Secret = JWT_SECRET;
const EXPIRES_IN = '1h';

export interface TokenResponse {
	token: string;
	expiresAt: number;
}

function generateToken(user: Partial<User>): TokenResponse {
	const token = jwt.sign({ userId: user.id, username: user.username, roles: user.roles }, SECRET_KEY, {
		expiresIn: EXPIRES_IN
	});
	const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60;
	return { token, expiresAt };
}
function refreshToken(token: string): TokenResponse | JsonWebTokenError {
	try {
		const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
		return generateToken({ id: decoded.userId, username: decoded.username, roles: decoded.roles });
	} catch (error) {
		return error as JsonWebTokenError;
	}
}

export { generateToken, refreshToken };
