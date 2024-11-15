import express from 'express';
import userService from './services/user.service';
import repairLogService from './services/repairLog.service';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use('/api/v1', userService);
app.use('/api/v1', repairLogService);

export default app;
