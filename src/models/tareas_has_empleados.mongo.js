const mongoose = require("mongoose");
const { Schema } = mongoose;

const Tarea_has_empleadosSchema = new Schema({
  idTarea: { type: String, required: true },
  idEmpleado: { type: String, required: true },
  fechacreacion: { type: String, required: false }

});

module.exports = mongoose.model("tarea_has_empleados", Tarea_has_empleadosSchema);
