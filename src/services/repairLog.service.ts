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
		this.router.get('/repair', this.controller.getRepairLog.bind(this.controller));
		this.router.put('/repair', this.controller.updateRepairLog.bind(this.controller));
		this.router.delete('/repair/:id', this.controller.deleteRepairLog.bind(this.controller));
	}
}

export default new RepairLogRouter().router;
