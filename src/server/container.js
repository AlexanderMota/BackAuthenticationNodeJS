const { createContainer, asClass, asValue, asFunction } = require("awilix");

//  config
const config = require("../config");
const app = require(".");

// services
const {
  HomeService,
  EmpleadoService,
  TareaService,
  AuthService
} = require("../services");

// controllers
const {
  HomeController,
  EmpleadoController,
  TareaController,
  AuthController
} = require("../controllers");

// routes
const {
  HomeRoutes,
  EmpleadoRoutes,
  TareaRoutes,
  AuthRoutes
} = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { Empleado, Tarea , TareaHasEmpleados} = require("../models");

// repositories
const {
  EmpleadoRepository,
  TareaRepository
} = require("../repositories");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    EmpleadoService: asClass(EmpleadoService).singleton(),
    TareaService: asClass(TareaService).singleton(),
    AuthService: asClass(AuthService).singleton()
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    EmpleadoController: asClass(EmpleadoController.bind(EmpleadoController)).singleton(),
    TareaController: asClass(TareaController.bind(TareaController)).singleton()
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    EmpleadoRoutes: asFunction(EmpleadoRoutes).singleton(),
    TareaRoutes: asFunction(TareaRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton()
  })
  .register({
    Empleado: asValue(Empleado),
    Tarea: asValue(Tarea),
    TareaHasEmpleados: asValue(TareaHasEmpleados)
  })
  .register({
    EmpleadoRepository: asClass(EmpleadoRepository).singleton(),
    TareaRepository: asClass(TareaRepository).singleton()
  });

module.exports = container;
