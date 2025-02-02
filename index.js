import container from './src/container.js';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Obtener el servicio de base de datos desde Awilix para asegurar que se conecte
const db = container.resolve('DBPool');
const app = container.resolve('app');
db.getConnection()
  .then(connection => {
    console.log('✅ Conexión a la base de datos establecida');
    connection.release();

    // Iniciar servidor Express
    app.start();
  })
  .catch(error => {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1); // Salir si hay error de conexión
  });
