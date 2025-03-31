import Joi from "joi";
import { IOwnerProps } from "./owner";

const ownerValidationSchema = Joi.object<IOwnerProps>({
    name: Joi.string().required(),
    middleName: Joi.string().optional(),
    lastName: Joi.string().required(),
    secondLastName: Joi.string().optional(),
    documentType: Joi.string().valid('DNI', 'RUC', 'CE').required(),
    documentNumber: Joi.string().required(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().optional(),
})

function ownerValidation(props: IOwnerProps): Joi.ValidationResult<IOwnerProps>{
    return ownerValidationSchema.validate(props, { abortEarly: false });
}

export { ownerValidation };