import { err, ok, Result } from "neverthrow";
import { ownerValidation } from "./owner.validation";

export interface IOwnerProps {
    name: string;
    middleName?: string;
    lastName: string;
    secondLastName?: string;
    documentType: string;
    documentNumber: string;
    phoneNumber?: string;
    email?: string
}

export class Owner {
    id: string;
    name: string;
    middleName?: string;
    lastName: string;
    secondLastName?: string;
    documentType: string;
    documentNumber: string;
    phoneNumber?: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(props: IOwnerProps) {
        Object.assign(this, props);    
    }

    static create(props: IOwnerProps): Result<Owner, string> {
        const { error } = ownerValidation(props);
        if(error) {
            const ownerError = error.details.map((error) => error.message).join('. ');
            return err(ownerError);
        }
        return ok(new Owner(props));
    }
}