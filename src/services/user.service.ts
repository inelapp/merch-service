import { Router } from "express";
import { UserController } from "src/controllers/auth/user/user.controller";

class UserRouter {
    router: Router;
    controller: UserController;

    constructor() {
        this.router = Router();
        this.controller = new UserController();
        this.routes();
    }

    routes() {
        this.router.route('/users')
            .post(this.controller.createUser.bind(this.controller))
        this.router.post('/users/confirm/:token', this.controller.confirmUser.bind(this.controller)),
        this.router.get('/users/:data', this.controller.getUser.bind(this.controller))
        this.router.post('/users/login', this.controller.login.bind(this.controller))
        this.router.post('/users/refresh-token', this.controller.refreshToken.bind(this.controller))
    }
}

export default new UserRouter().router;