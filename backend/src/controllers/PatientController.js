const PatientModel = require('../models/PatientModel');

class PatientController{
  //Create Patient
  async create(req, res){
    if(!req.body.nome){
      return res.status(404).json({error: 'O campo Nome é obrigatório'});
    }
    if(!req.body.telefone){
      return res.status(404).json({error: 'O campo Telefone é obrigatório'});
    }
    if(!req.body.plano){
      return res.status(404).json({error: 'O campo Plano é obrigatório'});
    }
    if(!req.body.cpf){
      return res.status(404).json({error: 'O campo CPF é obrigatório'});
    }
    const newPatient = {
      nome: req.body.nome,
      telefone: req.body.telefone,
      plano: req.body.plano,
      cpf: req.body.cpf,
    }
   //Verificando se o CPF já está cadastrado
   await PatientModel.findOne({'cpf': req.body.cpf})
    .then(response => {
      if(response){
        return res.status(404).json({error: 'CPF já cadastrado'});
      }else{
        //Salvando os dados
        const patient = new PatientModel(newPatient);
        patient.save()
        .then(response => {
          return res.status(200).json(response);
        })
        .catch(error => {
          return res.status(500).json(error);
        })
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    
  }

  
  //Update Patient
  async update(req, res){
    if(!req.body.nome){
      return res.status(404).json({error: 'O campo Nome é obrigatório'});
    }
    if(!req.body.telefone){
      return res.status(404).json({error: 'O campo Telefone é obrigatório'});
    }
    if(!req.body.plano){
      return res.status(404).json({error: 'O campo Plano é obrigatório'});
    }
    if(!req.body.cpf){
      return res.status(404).json({error: 'O campo CPF é obrigatório'});
    }
    const newPatient = {
      nome: req.body.nome,
      telefone: req.body.telefone,
      plano: req.body.plano,
      cpf: req.body.cpf,
    }
    //Verificando se o CPF ja está cadastrado
    await PatientModel.findOne({'cpf': req.body.cpf})
    .then(response => {
      if(response && response._id != req.params.id){
        return res.status(404).json({error: 'CPF já existente'});
      }else{
         PatientModel.findByIdAndUpdate({'_id': req.params.id}, newPatient, {new: true})
         .then(response => {
           return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          })
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    })  
  }  
 
  //Delete Patient
  async delete(req, res){
    await PatientModel.deleteOne({'_id': req.params.id})
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }

  //Read All
  async all(req, res){
    await PatientModel.find()
    .sort('nome')//organizando por nome
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }
  
    //Read by Name
    async name(req, res){
    const searchRegex = new RegExp(req.params.name);
    await PatientModel.find({'nome': searchRegex}).limit(10)
    .then(response => {
      if(response){
        return res.status(200).json(response);
      }else{
        return res.status(404).json({error: 'Usuário não encontrado'});
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }
  
    //Read by Id
    async id(req, res){
    await PatientModel.findById(req.params.id)
    .then(response => {
      if(response){
        return res.status(200).json(response);
      }else{
        return res.status(404).json({error: 'Usuário não encontrado'});
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }
  
    //Read by CPF
    async cpf(req, res){
    await PatientModel.find({'cpf': req.params.cpf})
    .then(response => {
      if(response){
        return res.status(200).json(response);
      }else{
        return res.status(404).json({error: 'Usuário não encontrado'});
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }
  
    

}

module.exports = new PatientController();
