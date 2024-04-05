const mongoose = require("mongoose");
const { Schema } = mongoose;

const VehiculoSchema = new Schema({
  matricula: { type: String, required: true },
  propietario: { type: String, required: true },
  plazas: { type: Number, required: true },
  descripcion: { type: String, required: true },
  puntosDestinoRecogida : { type: [] }, //id de la ubicación a la que se dirige y las paradas
  fechaRegistro: { type: String, required: true , default: new Date(Date.now()).toISOString() }
});
module.exports = mongoose.model("vehiculo", VehiculoSchema);
