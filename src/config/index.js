/*if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}*/

module.exports = {
  PORT : process.env.PORT,
  WEBSITE_PORT : process.env.WEBSITE_PORT,
  MONGO_URI: process.env.DATABASE_URL,
  MONGO_URI_DEV: process.env.DATABASE_URL_DEV,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  //CACHE_KEY: process.env.CACHE_KEY,
  SWAGGER_PATH: `../config/swagger/${process.env.SWAGGER_PROD}.json`
};
