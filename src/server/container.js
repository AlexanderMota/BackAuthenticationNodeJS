const { createContainer, asClass, asValue, asFunction } = require("awilix");

//  config
const config = require("../config");
const app = require(".");

// services
const {
  EmpleadoService,
  TareaService,
  AuthService
} = require("../services");

// controllers
const {
  EmpleadoController,
  TareaController,
  AuthController
} = require("../controllers");

// routes
const {
  EmpleadoRoutes,
  TareaRoutes,
  AuthRoutes
} = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { 
  Empleado, 
  Tarea, 
  TareaHasEmpleados, 
  Solicitud
} = require("../models");

// repositories
const {
  EmpleadoRepository,
  TareaRepository,
  SolicitudRepository
} = require("../repositories");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
  })
  .register({
    EmpleadoService: asClass(EmpleadoService).singleton(),
    TareaService: asClass(TareaService).singleton(),
    AuthService: asClass(AuthService).singleton()
  })
  .register({
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    EmpleadoController: asClass(EmpleadoController.bind(EmpleadoController)).singleton(),
    TareaController: asClass(TareaController.bind(TareaController)).singleton()
  })
  .register({
    EmpleadoRoutes: asFunction(EmpleadoRoutes).singleton(),
    TareaRoutes: asFunction(TareaRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton()
  })
  .register({
    Empleado: asValue(Empleado),
    Tarea: asValue(Tarea),
    TareaHasEmpleados: asValue(TareaHasEmpleados),
    Solicitud: asValue(Solicitud)
  })
  .register({
    EmpleadoRepository: asClass(EmpleadoRepository).singleton(),
    TareaRepository: asClass(TareaRepository).singleton(),
    SolicitudRepository: asClass(SolicitudRepository).singleton()
  });

module.exports = container;
