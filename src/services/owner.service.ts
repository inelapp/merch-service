import { Router } from "express";
import { OwnerController } from "../controllers/owner/owner.controller";

class OwnerRouter {
    router: Router;
    controller: OwnerController;

    constructor(){
        this.router = Router();
        this.controller = new OwnerController();
        this.routes();
    }

    routes(){
        this.router.route("/owner")
            .post(this.controller.createOwner)
            .get(this.controller.getOwners)
        this.router.route("/owner/:id")
            .get(this.controller.getOwnerById)
            .patch(this.controller.updateOwner)
            .delete(this.controller.deleteOwner);
    }
}

export default new OwnerRouter().router;