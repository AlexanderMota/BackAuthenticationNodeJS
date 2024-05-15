const mongoose = require("mongoose");
const { Schema } = mongoose;

const VehiculoSchema = new Schema({
  matricula: { type: String, required: true },
  marca: { type: String, required: false },
  modelo: { type: String, required: false },
  color: { type: String, required: false },
  propietario: { type: String, required: true },
  descripcion: { type: String, required: true },
  plazas: { type: Number, required: true },
  //plazasDisponibles: { type: Number, required: true },
  puntosDestinoRecogida: { type: [], required: false},
  ocupantes : { type: [], required: false },
  puntosDestinoRecogida : { type: [] },
  fechaRegistro: { type: Date, default: () => new Date(), required: true }
});
module.exports = mongoose.model("vehiculo", VehiculoSchema);
