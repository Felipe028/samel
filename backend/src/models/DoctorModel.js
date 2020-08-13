const mongoose = require('../config/database');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  nome: {type: String, required: true},
  especialidade: {type: String},
  crm: {type: String, required: true},
  senha: {type: String},
  created: {type: Date, default: Date.now()}
})

DoctorSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});

module.exports = mongoose.model('doctors', DoctorSchema);
