import { vehicleRepository } from '../../../repositories';
import GetVehicle from './getVehicle';

const getVehicle = new GetVehicle(vehicleRepository);

export { getVehicle };
