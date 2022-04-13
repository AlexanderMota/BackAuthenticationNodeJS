const { createContainer, asClass, asValue, asFunction } = require("awilix");

//  config
const config = require("../config");
const app = require(".");

// services
const {
  HomeService,
  EmpleadoService,
  AuthService
} = require("../services");

// controllers
const {
  HomeController,
  EmpleadoController,
  AuthController
} = require("../controllers");

// routes
const {
  HomeRoutes,
  EmpleadoRoutes,
  AuthRoutes
} = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { Empleado } = require("../models");

// repositories
const {
  EmpleadoRepository
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
    AuthService: asClass(AuthService).singleton()
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    EmpleadoController: asClass(EmpleadoController.bind(EmpleadoController)).singleton()
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    EmpleadoRoutes: asFunction(EmpleadoRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton()
  })
  .register({
    Empleado: asValue(Empleado)
  })
  .register({
    EmpleadoRepository: asClass(EmpleadoRepository).singleton()
  });

module.exports = container;
