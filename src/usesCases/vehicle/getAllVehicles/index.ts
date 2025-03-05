import { vehicleRepository } from '../../../repositories';
import GetAllVehicles from './getAllVehicles';

const getAllVehicles = new GetAllVehicles(vehicleRepository);

export { getAllVehicles };
