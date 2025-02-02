import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

if (process.env.ENVIRONMENT !== 'production') {
    dotenv.config();
}

// Crear un pool de conexiones
export const DBPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
