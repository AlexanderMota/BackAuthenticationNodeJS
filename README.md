# Back Todo List - Node.js  

Este proyecto es una API desarrollada en Node.js que utiliza un enfoque basado en la **inyección de dependencias** con Awilix. Esto facilita la contrucción de la aplicación siguiendo una arquitectura de **microservicios** y **Rest**.

Su principal objetivo es gestionar los datos necesarios para un frontend y manejar sesiones de usuario mediante **JSON Web Tokens (JWT)**.  

El proyecto es un remake de mi Trabajo de Fin de Grado (TFG) y forma parte de mi portfolio profesional.  

## Funcionalidades principales  

- **Gestión de usuarios**: Registro, inicio de sesión y autenticación segura con JWT.  
- **Gestión de tareas**: Creación, asignación y seguimiento de tareas entre usuarios.  
- **Organización de transporte**: Futuras funciones para planificar transporte entre compañeros de trabajo.  
- **Gestión logística**: Funciones SGE (Sistemas de Gestión Empresarial) para optimizar la colaboración en equipo.  

## Tecnologías utilizadas  

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.  
- **Express.js**: Framework minimalista para la creación del servidor.  
- **Awilix**: Implementación de inyección de dependencias para una arquitectura modular y escalable.  
- **JWT**: Sistema de autenticación mediante tokens seguros.  
- **MySQL**: Base de datos relacional para almacenar usuarios, tareas y otros datos clave.  

## Estructura del proyecto  

El proyecto sigue una arquitectura organizada y modular:  

src/

├── config/ # Configuración del entorno y variables

├── controllers/ # Lógica para las rutas y manejo de peticiones

├── models/ # Definición de las entidades y sus propiedades

├── repositories/ # Operaciones con la base de datos (CRUD)

├── services/ # Lógica de negocio y casos de uso

├── utils/ # Funciones auxiliares y herramientas

├── container.js # Configuración de inyección de dependencias con Awilix

└── index.js # Archivo principal para iniciar el servidor


### Explicación de las carpetas  

- **config/**: Aquí se manejan las configuraciones clave, como la conexión a la base de datos o las claves secretas para JWT.  
- **controllers/**: Define las rutas y la lógica que conecta las peticiones HTTP con los servicios correspondientes.  
- **models/**: Contiene las definiciones de las entidades principales, como `User` y `Task`.  
- **repositories/**: Maneja directamente las consultas a la base de datos, centralizando el acceso a los datos.  
- **services/**: Implementa la lógica de negocio, asegurando que las reglas del dominio se cumplan.  
- **utils/**: Incluye funciones reutilizables, como validaciones o formateos.  
- **container.js**: Configura el contenedor de dependencias con Awilix para inyectar y resolver servicios.  

## Cómo iniciar el proyecto  

1. Clona el repositorio:

   ```bash
   git clone https://github.com/AlexanderMota/BackToDoListNodeJS.git
   
2. Instala las dependencias:

   ```bash
   npm install

3. Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto con el siguiente contenido (ajusta según sea necesario):

 - PORT=3000  
 - DB_HOST=localhost  
 - DB_USER=root  
 - DB_PASSWORD=yourpassword  
 - DB_NAME=todo_list  
 - JWT_SECRET=your_secret_key  

4. Ejecuta el servidor:

   ```bash
   npm run dev  

5. Accede al proyecto en el navegador o herramientas como Postman:

 - http://localhost:4300  

## Futuras funcionalidades

**Roles de usuario:** Distinción entre administradores y empleados con permisos específicos.

**Gestión avanzada de tareas:** Organización en categorías, prioridad y notificaciones.

**Soporte logístico:** Planificación de transporte y gestión colaborativa de recursos.

**Mejoras visuales:** Utilización de librerías CSS modernas en el frontend.

**Integración con APIs externas:** Opciones para sincronizar datos con herramientas de terceros.

## Contribuciones

Si deseas colaborar, abre un issue o envía un pull request. ¡Toda ayuda es bienvenida! 😊

