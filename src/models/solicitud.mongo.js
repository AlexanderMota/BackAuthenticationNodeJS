const mongoose = require("mongoose");
const { Schema } = mongoose;

const SolicitudSchema = new Schema({
  idEmpleado: { type: Schema.Types.ObjectId, ref: 'Empleados', required: true },
  idTarea: { type: Schema.Types.ObjectId, ref: 'Tareas', required: true },
  fechaRegistro: { type: Date, default: () => new Date(), required: true },
  aprobada: { type: Boolean, required: true  }
});

module.exports = mongoose.model("solicitud", SolicitudSchema);
