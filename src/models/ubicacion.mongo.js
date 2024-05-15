const mongoose = require("mongoose");
const { Schema } = mongoose;

const UbicacionSchema = new Schema({
  idTarea: { type: String, required: false },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: false },
  longitud: { type: Number, required: true },
  latitud: { type: Number, required: true },
  fechasRecogida: { type: [{
    vehiculo: {type:String, required: true},
    fechaInicio: {type:Date, required: true},
    fechaFin: {type:Date, required: true}
  }], required: false},
  fechaRegistro: { type: Date, default: () => new Date(), required: true }
});

module.exports = mongoose.model("ubicacion", UbicacionSchema);
