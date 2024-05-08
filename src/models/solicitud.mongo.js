const mongoose = require("mongoose");
const { Schema } = mongoose;

const SolicitudSchema = new Schema({
  idSolicitud: { type: Number, required: false },
  idEmpleado: { type: String, required: true },
  idTarea: { type: String, required: true },
  fechaSolicitud: { type: Date, default: () => new Date(), required: true },
  aprobada: { type: Boolean, required: true  }
});

module.exports = mongoose.model("solicitud", SolicitudSchema);
