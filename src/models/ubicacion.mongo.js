const mongoose = require("mongoose");
const { Schema } = mongoose;

const UbicacionSchema = new Schema({
  idTarea: { type: Schema.Types.ObjectId, ref: 'Tareas', required: false },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: false },
  longitud: { type: Number, required: true },
  latitud: { type: Number, required: true },
  fechasRecogida: { type: [{
    vehiculo: {type:String, required: true},
    fechaInicio: {type:Date, required: true},
    fechaFin: {type:Date, required: true},
    _id: {type:String, required: false}
  }], required: false},
  fechaRegistro: { type: Date, default: () => new Date(), required: true }
});

module.exports = mongoose.model("ubicacion", UbicacionSchema);
