import express, { Request, Response } from 'express';
import userService from './services/user.service';
import repairLogService from './services/repairLog.service';
import morgan from 'morgan';
import cors from 'cors';
import vehicleService from './services/vehicle.service';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './utils/docs/v1/swagger-doc';
import ownerService from './services/owner.service';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
	})
);

app.use('/favicon.ico', (req: Request, res: Response) => res.status(204).end() as any);
app.use('/api/v1', userService, vehicleService, repairLogService, ownerService);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default app;
