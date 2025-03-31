import { IOwnerDb } from "../db/interface";
import { Owner } from "../domain/owner/owner";

export class OwnerMap {
    static fromDbToDomain(owner: IOwnerDb): Owner {
        return {
            id: owner._id,
            name: owner.name || '',
            middleName: owner.middleName || '',
            lastName: owner.lastName || '',
            secondLastName: owner.secondLastName || '',
            documentType: owner.documentType?.toUpperCase() || '',
            documentNumber: owner.documentNumber || '',
            phoneNumber: owner.phoneNumber || '',
            email: owner.email || '',
            createdAt: owner.createdAt,
            updatedAt: owner.updatedAt
        }
    }
}