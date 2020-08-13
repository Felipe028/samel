const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  hda: {type: String},//História da doença atual
  hpp: {type: String},//Histíria patológica progressiva
  hf: {type: String},//Histórico familiar
  receita: {type: String},
  id_crm: {type: Schema.Types.ObjectId, ref: 'doctors' },
  id_cpf: {type: Schema.Types.ObjectId, ref: 'patients' },
  dia: {type: Date, required: true},
  finalizada: {type: Boolean, default: false},
  created: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('attendances', AttendanceSchema);