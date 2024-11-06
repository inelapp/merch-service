import bcrypt from 'bcryptjs';

async function encrypt(textPlain: string): Promise<string> {
	const hash = await bcrypt.hash(textPlain, 10);
	return hash;
}

async function compare(passwordPlain: string, passwordHashed: string): Promise<boolean> {
	return await bcrypt.compare(passwordPlain, passwordHashed);
}

export { encrypt, compare };
