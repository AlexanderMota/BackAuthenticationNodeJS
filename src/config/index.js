if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  PORT: 5000,//process.env.PORT,
  MONGO_URI: "mongodb+srv://AlexSinMas:1231212_@cluster0.gwz1u.mongodb.net/shareyouridea?retryWrites=true&w=majority",//process.env.MONGO_URI,
  APPLICATION_NAME: "api-granja",//process.env.APPLICATION_NAME,
  JWT_SECRET: "4l3x4nd3r82@_",//"process.env.JWT_SECRET",
  //CACHE_KEY: process.env.CACHE_KEY,
  SWAGGER_PATH: `../config/swagger/swaggerPROD.json`//`../config/swagger/${process.env.SWAGGER_DOC}.json`
};
