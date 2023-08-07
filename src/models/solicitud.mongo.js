const mongoose = require("mongoose");
const { Schema } = mongoose;

const SolicitudSchema = new Schema({
  idSolicitud: { type: Number, required: false },
  idEmpleado: { type: String, required: true },
  idTarea: { type: String, required: true },
  fechaSolicitud: { type: String, default: new Date(Date.now()).toISOString() },
  aprovada: { type: Boolean, required: false  }
});

module.exports = mongoose.model("solicitud", SolicitudSchema);
