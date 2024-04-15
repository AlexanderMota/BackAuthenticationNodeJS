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
  ocupantes : { type: [] },
  puntosDestinoRecogida : { type: [] },
  fechaRegistro: { type: String, required: true , default: new Date(Date.now()).toISOString() }
});
module.exports = mongoose.model("vehiculo", VehiculoSchema);
