import { vehicleRepository } from '../../../repositories';
import UpdateVehicle from './updateVehicle';

const updateVehicle = new UpdateVehicle(vehicleRepository);

export { updateVehicle };
