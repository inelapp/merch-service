export interface CreateVehicleRequestDto {
	make: string;
	model: string;
	year: number;
	category: string;
	licensePlate: string;
	registrationDate: Date;
	notes?: string | null;
	ownerId: string | null;
	status?: string;
}
