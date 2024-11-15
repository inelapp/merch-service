import { Router } from 'express';
import { RepairLogController } from 'src/controllers/repair/repairLog.controller';

class RepairLogRouter {
	router: Router;

	controller: RepairLogController;

	constructor() {
		this.router = Router();
		this.controller = new RepairLogController();
		this.routes();
	}

	routes() {
		this.router.post('/repair', this.controller.createRepairLog.bind(this.controller));
	}
}

export default new RepairLogRouter().router;
