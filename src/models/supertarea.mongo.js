const mongoose = require("mongoose");
const { Schema } = mongoose;

const Supertarea = new Schema({
  idTarea: { type: String, required: true },
  fechacreacion: { type: Date, default: () => new Date(), required: true }
});

module.exports = mongoose.model("supertarea", Supertarea);
