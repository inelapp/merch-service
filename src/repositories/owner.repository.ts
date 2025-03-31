import { IOwnerProps, Owner } from "../domain/owner/owner";

export interface OwnerFilters {
    documentNumber?: string;
    name?: string;
    middleName?: string;
    lastName?: string;
    secondLastName?: string;
    documentType?: string;
    phoneNumber?: string;
    email?: string;
}

export interface IOwnerRepository {
    getOwner(filters?: OwnerFilters): Promise<Owner | null>;
    getOwners(filters?: OwnerFilters): Promise<Owner[]>;
    getOwnerById(id: string): Promise<Owner| null>;
    createOwner(owner: IOwnerProps): Promise<Owner>;
    updateOwner(id: string, owner: Partial<IOwnerProps>): Promise<Owner >;
    deleteOwner(id: string): Promise<void>;
}