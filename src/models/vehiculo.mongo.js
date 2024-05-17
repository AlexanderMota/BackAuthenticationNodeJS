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
  ocupantes: [{ type: Schema.Types.ObjectId, ref: 'Empleados' }]
});

const Vehiculo = mongoose.model('vehiculo', VehiculoSchema);

module.exports = Vehiculo;
/*
const VehiculoSchema = new Schema({
  matricula: { type: String, required: true },
  marca: { type: String, required: false },
  modelo: { type: String, required: false },
  color: { type: String, required: false },
  propietario: { type: String, required: true },
  descripcion: { type: String, required: true },
  plazas: { type: Number, required: true },
  //plazasDisponibles: { type: Number, required: true },
  //puntosDestinoRecogida: { type: [], required: false},
  puntosDestinoRecogida: { type: [{
    destino: {type:String, required: true},
    idParada: {type:Date, required: true}
  }]},
  ocupantes : { type: [], required: false },
  puntosDestinoRecogida : { type: [] },
  fechaRegistro: { type: Date, default: () => new Date(), required: true }
});
module.exports = mongoose.model("vehiculo", VehiculoSchema);*/
