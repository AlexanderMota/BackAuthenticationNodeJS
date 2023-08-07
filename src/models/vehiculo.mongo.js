const mongoose = require("mongoose");
const { Schema } = mongoose;

const VehiculoSchema = new Schema({
  matricula: { type: String, required: true },
  propietario: { type: String, required: true },
  plazas: { type: Number, required: true },
  descripcion: { type: String, required: true },
  lugarRecogida : { type: String },
  fechaRegistro: { type: String, required: true , default: new Date(Date.now()).toISOString() }
});

module.exports = mongoose.model("vehiculo", VehiculoSchema);
