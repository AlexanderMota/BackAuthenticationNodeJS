const mongoose = require("mongoose");
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

const EmpleadoSchema = new Schema({
  //idEmpleado: { type: Number, required: true },
  centroTrabajo: { type: String, required: true },
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  telefono: { type: String },
  email: { type: String },
  rol: { nombre : String, valor : Number },
  fechaContrato : { type: String , default: new Date(Date.now()).toISOString() },
  password: { type: String, required: true }
});

EmpleadoSchema.methods.toJSON = function() {
  let empleado = this.toObject();
  delete empleado.password;
  return empleado;
};

EmpleadoSchema.methods.comparePasswords = function(password) {
  return compareSync(password, this.password);
};

EmpleadoSchema.pre("save", async function(next) {
  const empleado = this;

  if (!empleado.isModified("password")) {
    return next();
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(empleado.password, salt);
  empleado.password = hashedPassword;
  next();
});

module.exports = mongoose.model("empleado", EmpleadoSchema);
