import Joi from "joi";
import { IUserProps } from "./user";

const userSchema = Joi.object<IUserProps>({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().optional(),
    token: Joi.string().optional(),
    status: Joi.string().optional().valid('active', 'inactive', 'pending')
})

const validateUserSchema = (user: IUserProps): Joi.ValidationResult<IUserProps> => {
    return userSchema.validate(user, { abortEarly: false })
}

export { validateUserSchema }