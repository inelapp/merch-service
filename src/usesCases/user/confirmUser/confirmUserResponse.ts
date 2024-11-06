export interface ConfirmUserResponseDto {
	id: string;
	username: string;
	email?: string;
	status: string;
	token?: string | null;
}
