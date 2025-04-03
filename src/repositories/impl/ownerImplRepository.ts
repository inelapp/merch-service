import { Owner, IOwnerProps } from "../../domain/owner/owner";
import { IOwnerRepository, OwnerFilters } from "../owner.repository";
import { OwnerModel } from "../../db/mongo.schema";
import { OwnerMap } from "../../mappers/ownerMap";
import { IOwnerDb } from "../../db/interface";

export class OwnerImplRepository implements IOwnerRepository {
    private readonly ownerModel: typeof OwnerModel;
    constructor() {
        this.ownerModel = OwnerModel;
    }
    async getOwner(filters?: OwnerFilters): Promise<Owner | null> {
        try {
            const owner = await this.ownerModel.findOne(filters);
            if (!owner) return null;
            return OwnerMap.fromDbToDomain(owner);
        } catch (error) {
            throw error;
        }
    }
    async getOwners(filters?: OwnerFilters): Promise<Owner[]> {
        try {
            const owners = await this.ownerModel.find({ ...filters });
            return owners.map((owner) => OwnerMap.fromDbToDomain(owner));
        } catch (error) {
            throw error;
        }
    }
    async getOwnerById(id: string): Promise<Owner | null> {
        try {
            const owner = await this.ownerModel.findById(id);
            if (!owner) return null;
            return OwnerMap.fromDbToDomain(owner);
        } catch (error) {
            throw error;
        }
    }
    async createOwner(owner: IOwnerProps): Promise<Owner> {
        try {
            const newOwner = new this.ownerModel({
                ...owner,
            });
            const savedOwner = await newOwner.save();
            return OwnerMap.fromDbToDomain(savedOwner);
        } catch (error) {
            throw error;
        }
    }
    async updateOwner(id: string, ownerUpdated: Partial<IOwnerProps>): Promise<Owner> {
        try {
            const updatedOwner = await this.ownerModel.findByIdAndUpdate(id, ownerUpdated, {
                new: false,
            });
            const owner = await this.ownerModel.findById(updatedOwner?._id);
            return OwnerMap.fromDbToDomain(owner as IOwnerDb);
        } catch (error) {
            throw error;
        }
    }
    async deleteOwner(id: string): Promise<void> {
        try {
            await this.ownerModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}