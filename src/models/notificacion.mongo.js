const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificacionSchema = new Schema({
  idEmpleado: { type: Schema.Types.ObjectId, ref: 'Empleados', required: true },
  leido: { type: Boolean, required: true, default:false },
  mensaje: { type: String, required: true },
  fechaRegistro: { type: Date, default: () => new Date(), required: true }
});

module.exports = mongoose.model("notificacion", NotificacionSchema);
