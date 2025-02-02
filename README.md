# Backend Autenticación - Node.js

Este proyecto es un microservicio de autenticación desarrollado en **Node.js** que se enfoca en **gestionar la autenticación de usuarios** mediante el uso de **JSON Web Tokens (JWT)**. El sistema permite el registro, inicio de sesión y verificación de usuarios, asegurando la seguridad de las sesiones mediante el uso de tokens cifrados.

Este servicio es parte de un sistema más grande y modular, que utiliza un enfoque basado en la **inyección de dependencias** con **Awilix**, lo que permite una arquitectura escalable y bien organizada. Este microservicio de autenticación es una pieza fundamental dentro de una arquitectura de **microservicios**, donde cada componente gestiona su propio dominio de responsabilidad, y se comunica de manera eficiente con los demás servicios de la plataforma.

Este proyecto es una versión moderna y optimizada de mi **Trabajo de Fin de Grado (TFG)** y forma parte de mi portfolio profesional.


## Funcionalidades principales

- **Registro de usuarios**: Permite crear nuevos usuarios con validación y almacenamiento seguro de contraseñas.
- **Inicio de sesión**: Autentica a los usuarios y genera un **JWT** para mantener sesiones seguras.
- **Verificación de token JWT**: Permite verificar la validez de los tokens JWT para garantizar el acceso solo a usuarios autenticados.
- **Seguridad de contraseñas**: Utiliza **bcrypt** para el hash seguro de contraseñas antes de almacenarlas en la base de datos.


## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework minimalista para la creación del servidor y manejo de rutas.
- **Awilix**: Implementación de inyección de dependencias para una arquitectura modular y escalable.
- **JWT**: Sistema de autenticación mediante tokens seguros para sesiones de usuario.
- **bcrypt**: Librería para el cifrado de contraseñas de forma segura.
- **MySQL**: Base de datos relacional para almacenar información de usuarios.


## Estructura del proyecto

El proyecto sigue una arquitectura organizada y modular:

```bash
src/
├── config/                # Configuración del entorno y variables clave.
├── controllers/           # Lógica para las rutas de autenticación y manejo de peticiones.
├── models/                # Definición de las entidades de usuario.
├── repositories/          # Operaciones con la base de datos (CRUD para usuarios).
├── services/              # Lógica de negocio para la autenticación y validación de usuarios.
├── validations/           # Funciones auxiliares, como generación de tokens y validación.
├── container.js           # Contenedor de dependencias con Awilix para facilitar la inyección.
└── index.js               # Archivo principal para iniciar el servidor y las rutas.
```


## Cómo iniciar el proyecto

1. **Clona el repositorio:**
```bash
git clone https://github.com/TuUsuario/MicroBackAuthenticationNodeJS.git
```
2. **Instala las dependencias:**
```bash
npm install
```
3. **Configura las variables de entorno:**

- Crea un archivo .env en la raíz del proyecto con el siguiente contenido (ajusta según sea necesario):
```bash
ENVIRONMENT= development
PORT=3000
DB_HOST=localhost
DB_PORT = 3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=authentication_db
JWT_SECRET=your_secret_key
SALT_ROUNDS = 6
```
4. Ejecuta el servidor:
```bash
npm run dev
```
5. Accede a la API en el navegador o herramientas como Postman:
```bash
URL: http://localhost:4300
```


## Futuras funcionalidades

**Roles de usuario:** Implementación de roles y permisos para diferentes tipos de usuarios.

**Recuperación de contraseña:** Funcionalidad para que los usuarios puedan restablecer su contraseña en caso de olvidarla.

**Integración con otros microservicios:** Ampliar el sistema para integrarse con otros microservicios, como la gestión de tareas, de manera segura mediante JWT.

**Mejoras en seguridad:** Autenticación multifactor (MFA) y medidas adicionales para fortalecer la seguridad.


## Contribuciones

Si deseas colaborar, abre un issue o envía un pull request. ¡Toda ayuda es bienvenida! 😊
