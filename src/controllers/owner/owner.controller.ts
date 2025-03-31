import { Request, Response } from "express";
import { StatusCode } from "../../types";
import { createOwner } from "../../usesCases/owner/createOwner";
import { CreateOwnerAlreadyExistsError, CreateOwnerBadRequestError } from "../../usesCases/owner/createOwner/createOwnerErrors";
import { CreateOwnerRequestDto } from "../../usesCases/owner/createOwner/createOwnerRequestDto";
import { response } from "../../utils/response";
import { getOwner } from "../../usesCases/owner/getOwner";
import { GetOwnerNotFoundError } from "../../usesCases/owner/getOwner/getOwnerErrors";
import { UpdateOwnerRequestDto } from "../../usesCases/owner/updateOwner/updateOwnerRequestDto";
import { updateOwner } from "../../usesCases/owner/updateOwner";
import { UpdateOwnerBadRequestError, UpdateOwnerNotFoundError } from "../../usesCases/owner/updateOwner/updateOwnerErrors";
import { deleteOwner } from "../../usesCases/owner/deleteOwner";
import { DeleteOwnerNotFoundError } from "../../usesCases/owner/deleteOwner/deleteOwnerErrors";
import { getOwners } from "../../usesCases/owner/getOwners";
import { GetOwnersBadRequestError } from "../../usesCases/owner/getOwners/getOwnersErrors";

export class OwnerController {
    constructor(){

    }

    async getOwners(req: Request, res: Response) {
        const result = await getOwners.execute(req.query);
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case GetOwnersBadRequestError:
                    return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, StatusCode.OK);
    }

    async createOwner(req: Request, res: Response) {
        const { name, middleName, lastName, secondLastName, documentType, documentNumber, phoneNumber, email } = req.body as CreateOwnerRequestDto;
        const result = await createOwner.execute({
            name,
            middleName,
            lastName,
            secondLastName,
            documentType,
            documentNumber,
            phoneNumber,
            email
        })
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case CreateOwnerBadRequestError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
                case CreateOwnerAlreadyExistsError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, StatusCode.CREATED);
    }

    async getOwnerById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await getOwner.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case GetOwnerNotFoundError:
                    return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, StatusCode.OK);
    }

    async updateOwner(req: Request, res: Response) {
        const { id } = req.params;
        const { name, middleName, lastName, secondLastName, documentType, documentNumber, phoneNumber, email } = req.body as UpdateOwnerRequestDto;
        const result = await updateOwner.execute({
            id,
            name,
            middleName,
            lastName,
            secondLastName,
            documentType,
            documentNumber,
            phoneNumber,
            email
        });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case UpdateOwnerNotFoundError:
                    return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
                case UpdateOwnerBadRequestError:
                    return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, StatusCode.OK);
    }

    async deleteOwner(req: Request, res: Response) {
        const { id } = req.params;
        const result = await deleteOwner.execute({ id });
        if (result.isErr()) {
            const error = result.error;
            switch (error.constructor) {
                case DeleteOwnerNotFoundError:
                    return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
                default:
                    return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
            }
        }
        return response(res, result.value, StatusCode.OK);
    }
}