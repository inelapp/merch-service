export interface CreateOwnerRequestDto {
    name: string;
    middleName?: string;
    lastName: string;
    secondLastName?: string;
    documentType: string;
    documentNumber: string;
    phoneNumber?: string;
    email?: string
}