const mongoose = require("mongoose");
const { Schema } = mongoose;

const UbicacionSchema = new Schema({
  idTarea: { type: String, required: false },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  longitud: { type: Number, required: true },
  latitud: { type: Number, required: true },
  fechasRecogida: { type: [] }, // la ubi no debe tener idTarea si es una parada
  //limiteSupDer: { type: Number, required: false },
  //limiteInfIzq: { type: Number, required: false },
  //zoom: {type: Number, required: false},
  fechaRegistro: { type: String, required: true , default: new Date(Date.now()).toISOString() }
});

module.exports = mongoose.model("ubicacion", UbicacionSchema);
