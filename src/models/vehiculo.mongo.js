const mongoose = require("mongoose");
const { Schema } = mongoose;

const PuntoDestinoRecogidaSchema = new Schema({
  idParada: { type: String, required: true },
  idDestino: { type: String,required: true  }
});

const VehiculoSchema = new Schema({
  matricula: { type: String, required: true },
  propietario: { type: Schema.Types.ObjectId, ref: 'Empleados', required: true },
  plazas: { type: Number, required: true },
  descripcion: { type: String },
  fechaRegistro: { type: Date, default: Date.now },
  puntosDestinoRecogida: [PuntoDestinoRecogidaSchema],
  ocupantes: { type: [Schema.Types.ObjectId], ref: 'Empleados' }
});

const Vehiculo = mongoose.model('vehiculo', VehiculoSchema);

module.exports = Vehiculo;
