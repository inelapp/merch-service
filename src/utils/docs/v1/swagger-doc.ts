import { boolean, number } from 'joi';
import { HOST, SWAGGER_SCHEMA } from '../../../config';

export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Mecánica API',
    description: 'API Documentation'
  },
  host: HOST,
  basePath: '/api/v1',
  schemes: [SWAGGER_SCHEMA],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/vehicles': {
      post: {
        tags: ['Vehicle'],
        summary: 'Create a new vehicle',
        requestBody: {
          description: 'Vehicle object that needs to be added',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/CreateVehicleRequestDto'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Vehicle created successfully',
            schema: {
              $ref: '#/definitions/CreateVehicleResponseDto'
            }
          },
          400: {
            description: 'Bad request',
            schema: {
              $ref: '#/definitions/VehicleCreateBadRequestError'
            }
          }
        }
      },
      get: {
        tags: ['Vehicle'],
        summary: 'Get all vehicles',
        responses: {
          200: {
            description: 'List of vehicles',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Vehicle'
              }
            }
          }
        }
      }
    },
    '/vehicles/{id}': {
      delete: {
        tags: ['Vehicle'],
        summary: 'Delete a vehicle by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID of the vehicle to delete'
          }
        ],
        responses: {
          200: {
            description: 'Vehicle deleted successfully'
          },
          400: {
            description: 'Bad request',
            schema: {
              $ref: '#/definitions/VehicleDeleteBadRequestError'
            }
          },
          404: {
            description: 'Vehicle not found',
            schema: {
              $ref: '#/definitions/VehicleNotFoundError'
            }
          }
        }
      },
      patch: {
        tags: ['Vehicle'],
        summary: 'Update a vehicle by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID of the vehicle to update'
          }
        ],
        requestBody: {
          description: 'Vehicle object that needs to be updated',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/UpdateVehicleRequestDto'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Vehicle updated successfully'
          },
          400: {
            description: 'Bad request',
            schema: {
              $ref: '#/definitions/VehicleUpdateBadRequestError'
            }
          },
          404: {
            description: 'Vehicle not found',
            schema: {
              $ref: '#/definitions/VehicleNotFoundError'
            }
          }
        }
      }
    }
  },
  definitions: {
    CreateVehicleRequestDto: {
      type: 'object',
      properties: {
        make: { type: 'string' },
        model: { type: 'string' },
        year: { type: 'number' },
        category: { type: 'string' },
        licensePlate: { type: 'string' },
        notes : { type: 'string' },
        ownerId: { type: 'string' }
      },
      required: ['make','licensePlate', 'model', 'year', 'ownerId', 'licensePlate', 'registrationDate', 'category']
    },
    CreateVehicleResponseDto: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        make: { type: 'string' },
        model: { type: 'string' },
        year: { type: 'number' },
        category: { type: 'string' },
        licensePlate: { type: 'string' },
        registrationDate: { type: 'string' },
        notes: { type: 'string' },
        ownerId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    },
    Vehicle: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        make: { type: 'string' },
        model: { type: 'string' },
        year: { type: 'number' },
        category: { type: 'string' },
        licensePlate: { type: 'string' },
        registrationDate: { type: 'string' },
        notes: { type: 'string' },
        ownerId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    },
    VehicleCreateBadRequestError: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'Bad request' },
        statusCode: { type: 'number', example: 400 },
        type: { type: 'string', example: 'VehicleCreateBadRequestError' }
      }
    },
    VehicleAlreadyRegisteredError: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    GetVehicleBadRequestError: {
      type: 'object',
      properties: { 
        message: { type: 'string' }
      }
    },
    VehicleDeleteBadRequestError: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'Bad request' },
        statusCode: { type: 'number', example: 400 },
        type: { type: 'string', example: 'VehicleDeleteBadRequest' }
      }
    },
    VehicleNotFoundError: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'Not found' },
        statusCode: { type: 'number', example: 404 },
        type: { type: 'string', example: 'VehicleNotFoundError' }
      }
    },
    UpdateVehicleRequestDto: {
      type: 'object',
      properties: {
        licensePlate: { type: 'string' },
        model: { type: 'string' },
        year: { type: 'number' },
        ownerId: { type: 'string' }
      }
    },
    VehicleUpdateBadRequestError: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        error: { type: 'string', example: 'Bad request' },
        statusCode: { type: 'number', example: 400 },
        type: { type: 'string', example: 'VehicleUpdateBadRequestError' }
      }
    }
  }
};
