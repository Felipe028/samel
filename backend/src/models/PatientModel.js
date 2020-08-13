const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  nome: {type: String, required: true},
  telefone: {type: String, required: true},
  plano: {type: String, required: true},
  cpf: {type: String, required: true},
  created: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('patients', PatientSchema);