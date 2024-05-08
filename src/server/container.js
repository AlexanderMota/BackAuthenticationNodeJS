const { createContainer, asClass, asValue, asFunction } = require("awilix");

//  config
const config = require("../config");
const app = require(".");

// services
const {
  EmpleadoService,
  TareaService,
  AuthService,
  UbicacionService,
  SolicitudService,
  VehiculoService
} = require("../services");

// controllers
const {
  EmpleadoController,
  TareaController,
  AuthController,
  FileManagerController,
  UbicacionController,
  VehiculoController,
  SolicitudController
} = require("../controllers");

// routes
const {
  EmpleadoRoutes,
  TareaRoutes,
  AuthRoutes,
  FileManagerRoutes,
  UbicacionRoutes,
  SolicitudRoutes,
  VehiculoRoutes
} = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { 
  Empleado, 
  Tarea, 
  Supertarea,
  TareaHasEmpleados, 
  TareaHasSubtareas, 
  Solicitud,
  Comentario,
  Ubicacion,
  Vehiculo
} = require("../models");

// repositories
const {
  EmpleadoRepository,
  TareaRepository,
  SolicitudRepository,
  UbicacionRepository,
  VehiculoRepository
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
    AuthService: asClass(AuthService).singleton(),
    UbicacionService: asClass(UbicacionService).singleton(),
    SolicitudService: asClass(SolicitudService).singleton(),
    VehiculoService: asClass(VehiculoService).singleton()
  })
  .register({
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    EmpleadoController: asClass(EmpleadoController.bind(EmpleadoController)).singleton(),
    TareaController: asClass(TareaController.bind(TareaController)).singleton(),
    FileManagerController: asClass(FileManagerController.bind(FileManagerController)).singleton(),
    UbicacionController: asClass(UbicacionController.bind(UbicacionController)).singleton(),
    SolicitudController: asClass(SolicitudController.bind(SolicitudController)).singleton(),
    VehiculoController: asClass(VehiculoController.bind(VehiculoController)).singleton()
  })
  .register({
    EmpleadoRoutes: asFunction(EmpleadoRoutes).singleton(),
    TareaRoutes: asFunction(TareaRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    FileManagerRoutes: asFunction(FileManagerRoutes).singleton(),
    UbicacionRoutes: asFunction(UbicacionRoutes).singleton(),
    SolicitudRoutes: asFunction(SolicitudRoutes).singleton(),
    VehiculoRoutes: asFunction(VehiculoRoutes).singleton()
  })
  .register({
    Empleado: asValue(Empleado),
    Tarea: asValue(Tarea),
    Supertarea: asValue(Supertarea),
    TareaHasEmpleados: asValue(TareaHasEmpleados),
    TareaHasSubtareas: asValue(TareaHasSubtareas),
    Solicitud: asValue(Solicitud),
    Comentario: asValue(Comentario),
    Ubicacion: asValue(Ubicacion),
    Vehiculo: asValue(Vehiculo)
  })
  .register({
    EmpleadoRepository: asClass(EmpleadoRepository).singleton(),
    TareaRepository: asClass(TareaRepository).singleton(),
    SolicitudRepository: asClass(SolicitudRepository).singleton(),
    UbicacionRepository: asClass(UbicacionRepository).singleton(),
    VehiculoRepository: asClass(VehiculoRepository).singleton()
  });

module.exports = container;
