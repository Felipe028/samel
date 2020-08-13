const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/samel", {useNewUrlParser: true}).then(()=>{
  console.log("MongoDB conectado com sucesso")
}).catch((err)=>{
  console.log("Erro ao se conectar: "+err)
})

module.exports = mongoose;
