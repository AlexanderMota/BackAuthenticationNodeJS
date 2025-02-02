// elementos del contenedor de inyección de dependencias
import { createContainer, asClass, asValue, asFunction } from 'awilix';

// configuración de la aplicación
import app from './server.js';
import { DBPool } from './config/index.js';

// routers
import {AuthRoutes} from './routes/index.js';
import routes from './routes/routes.js';

// controladores
import {AuthController} from './controllers/index.js';

// servicios
import {AuthService} from './services/index.js';

// repositorios
import {UserRepository} from './repositories/index.js';

// modelos
//import {User} from './models/index.js';

// validaciones
import { UserValidations } from './validations/index.js';



const container = createContainer();
//  Registra la configuración de la aplicación
container.register({
  app: asClass(app).singleton(),
  routes: asFunction(routes).singleton(),
  DBPool: asValue(DBPool)
});

// Registrar Rutas
container.register({
  AuthRoutes: asFunction(AuthRoutes).singleton()
});

// Registrar Controladores
container.register({
  AuthController: asClass(AuthController).singleton()
});

// Registrar Servicios
container.register({
  AuthService: asClass(AuthService).singleton()
});

// Registrar Repositorios
container.register({
  UserRepository: asClass(UserRepository).singleton()
});

// Registrar Modelos
/*container.register({
  User: asValue(User)
});*/

// Registrar Validaciones
container.register({
  UserValidations: asValue(UserValidations)
});

export default container;
