const DoctorModel = require('../models/DoctorModel');

class DoctorController{
  //Create Doctor
  async create(req, res){
    if(!req.body.nome){
      return res.status(404).json({error: 'O campo nome é obrigatório'});
    }
    if(!req.body.crm){
      return res.status(404).json({error: 'O campo crm é obrigatório'});
    }


    const newDoctor = {
      nome: req.body.nome,
      especialidade: req.body.especialidade,
      crm: req.body.crm,
      senha: '123',
      created: req.body.created
    }
   //Verificando se o CRM já está cadastrado
   await DoctorModel.findOne({'crm': req.body.crm})
    .then(response => {
      if(response){
        return res.status(404).json({error: 'CRM já cadastrado'});
      }else{
        //Salvando os dados
        const doctor = new DoctorModel(newDoctor);
        doctor.save()
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

  
  //Update Doctor
  async update(req, res){
    if(!req.body.nome){
      return res.status(404).json({error: 'O campo nome é obrigatório'});
    }
    if(!req.body.crm){
      return res.status(404).json({error: 'O campo crm é obrigatório'});
    }
    
    const newDoctor = {
      nome: req.body.nome,
      especialidade: req.body.especialidade,
      crm: req.body.crm,
      senha: '123',
      created: req.body.created
    }
    //Verificando se o CRM ja está cadastrado
    await DoctorModel.findOne({'crm': req.body.crm})
    .then(response => {
      if(response && response._id != req.params.id){
        return res.status(404).json({error: 'CRM já existente'});
      }else{
         DoctorModel.findByIdAndUpdate({'_id': req.params.id}, newDoctor, {new: true})
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
 
  //Delete Doctor
  async delete(req, res){
    await DoctorModel.deleteOne({'_id': req.params.id})
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }

  //Read All
  async all(req, res){
    await DoctorModel.find()
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
    await DoctorModel.find({'nome': searchRegex}).limit(10)
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
    await DoctorModel.findById(req.params.id)
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
  
    //Read by CRM
    async crm(req, res){
    await DoctorModel.find({'crm': req.params.crm})
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

module.exports = new DoctorController();
