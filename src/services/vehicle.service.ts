import { Router } from 'express';
import { VehicleController } from 'src/controllers/vehicle/vehicle.controller';

class VehicleRouter {
	router: Router;

	controller: VehicleController;

	constructor() {
		this.router = Router();
		this.controller = new VehicleController();
		this.routes();
	}

	routes() {
		this.router.route('/vehicle/create').post(this.controller.createVehicle.bind(this.controller));
	}
}

export default new VehicleRouter().router;