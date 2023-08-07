const mongoose = require("mongoose");
const { Schema } = mongoose;

const Supertarea = new Schema({
  idTarea: { type: String, required: true },
  fechacreacion: { type: String, required: false , default: new Date(Date.now()).toISOString() }
});

module.exports = mongoose.model("supertarea", Supertarea);
