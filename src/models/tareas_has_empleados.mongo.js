const mongoose = require("mongoose");
const { Schema } = mongoose;

const Tarea_has_empleadosSchema = new Schema({
  idTarea: { type: String, required: true },
  idEmpleado: { type: String, required: true },
  fechaRegistro: { type: Date, default: () => new Date(), required: true }

});

module.exports = mongoose.model("tarea_has_empleados", Tarea_has_empleadosSchema);
