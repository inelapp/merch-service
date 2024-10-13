import express from 'express';
import userService from './services/user.service';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userService);


export default app;