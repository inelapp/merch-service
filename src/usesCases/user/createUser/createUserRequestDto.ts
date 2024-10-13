export interface CreateUserRequestDto {
    username: string;
    password: string;
    email?: string;
    status: string;
    token?: string;
}