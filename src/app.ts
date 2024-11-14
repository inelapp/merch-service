import express from 'express';
import userService from './services/user.service';
import morgan from 'morgan';
import vehicleService from './services/vehicle.service';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use('/api/v1', userService);
app.use('/api/v1', vehicleService);

export default app;
