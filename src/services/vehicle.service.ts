import { Router } from 'express';
import { VehicleController } from '../controllers/vehicle/vehicle.controller';

class VehicleRouter {
	router: Router;

	controller: VehicleController;

	constructor() {
		this.router = Router();
		this.controller = new VehicleController();
		this.routes();
	}

	routes() {
		this.router
			.route('/vehicles')
			.get(this.controller.getAllVehicles.bind(this.controller))
			.post(this.controller.createVehicle.bind(this.controller));
		this.router
			.route('/vehicles/:id')
			.patch(this.controller.updateVehicle.bind(this.controller))
			.delete(this.controller.deleteVehicle.bind(this.controller));
	}
}

export default new VehicleRouter().router;
