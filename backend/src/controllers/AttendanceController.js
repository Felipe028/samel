const AttendanceModel = require('../models/AttendanceModel');
const DoctorModel = require('../models/DoctorModel');
const PatientModel = require('../models/PatientModel');

const current = new Date();//Data e hora atual
const {startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear} = require('date-fns'); //começo e final do dia

class AttendanceController{
  //Create Attendance
  async create(req, res){
    if(!req.body.crm){
      return res.status(404).json({error: 'O campo CRM é obrigatório'});
    }
    if(!req.body.cpf){
      return res.status(404).json({error: 'O campo CPF é obrigatório'});
    }
    if(!req.body.dia){
      return res.status(404).json({error: 'É nescessário inserir o dia do antendimento'});
    }
    //Verificando se o CRM existe
    const valid_crm = await DoctorModel.findOne({'crm': req.body.crm});
    const valid_cpf = await PatientModel.findOne({'cpf': req.body.cpf});
    
    if(!valid_crm){
      return res.status(404).json({error: 'CRM inválido!'});
    }
    if(!valid_cpf){
      return res.status(404).json({error: 'CPF inválido!'});
    }else{
      const valid_atendance = await AttendanceModel.findOne({ 'id_crm': valid_crm._id, 'dia' : req.body.dia });
      if(valid_atendance){
        return res.status(404).json({error: 'Já existem consultas marcadas para esse horário!'});
      }else{
        const newAttendance = {
          hda: req.body.hda,
          hpp: req.body.hpp,
          hf: req.body.hf,
          receita: req.body.receita,
          id_crm: valid_crm._id,
          id_cpf: valid_cpf._id,
          dia: req.body.dia,
        }

        //Salvando os dados
        const attendance = new AttendanceModel(newAttendance);
        attendance.save()
        .then(response => {
          return res.status(200).json(response);
        })
        .catch(error => {
          return res.status(500).json(error);
        })

      }
    }
  }

  
  //Update Attendance
  async update(req, res){
    const newAttendance = {
      hda: req.body.hda,
      hpp: req.body.hpp,
      hf: req.body.hf,
      receita: req.body.receita,
      finalizada: true,
    }
    AttendanceModel.findByIdAndUpdate({'_id': req.params.id}, newAttendance, {new: true})
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
       return res.status(500).json(error);
    })  
  }  
 
  //Delete Attendance
  async delete(req, res){
    const response = await AttendanceModel.findById(req.params.id);
      if(!response){
        return res.status(404).json({error: 'Atendimento não localizado'});
      }else{
        if(response.finalizada == true){
          return res.status(404).json({error: 'Atendimento finalizado não pode ser excluído'});
        }else{
          await AttendanceModel.deleteOne({'_id': req.params.id})
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          })
        }
      }
    }

    
  //Read All
  async all(req, res){
    await AttendanceModel.find().populate('id_crm').populate('id_cpf')
    .sort('dia')//organizando por dia
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })      
    }

  //Read Today
  async today(req, res){
    await AttendanceModel.find({'dia': {'$gte': startOfDay(current), '$lte': endOfDay(current)}})
    .populate('id_crm').populate('id_cpf')
    .sort('dia')//Atendimento organizado por data e hora
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }

  //Read All in specific date
  async allDate(req, res){
    const currentini = new Date(req.params.ini);
    const currentfim = new Date(req.params.fim);
    await AttendanceModel.find({
      'dia': {'$gte': startOfDay(currentini), '$lte': endOfDay(currentfim)}
    })
    .populate('id_crm').populate('id_cpf')
    .sort('dia')//Atendimento organizado por data e hora
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }

  //Read By Patient
  async byPatient(req, res){
    await AttendanceModel.find({'id_cpf' : {'$in' : req.params.id_cpf}})
    .populate('id_crm').populate('id_cpf')
    .sort('dia')//Atendimento organizado por data e hora
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }

  //Read By Doctor
  async byDoctor(req, res){
    await AttendanceModel.find({'id_crm' : {'$in' : req.params.id_crm}})
    .populate('id_crm').populate('id_cpf')
    .sort('dia')//Atendimento organizado por data e hora
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }


  //Read Today By Doctor
  async todayByDoctor(req, res){
    await AttendanceModel.find({
      'id_crm' : {'$in' : req.params.id_crm},
      'dia': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
    })
    .populate('id_crm').populate('id_cpf')
    .sort('dia')//Atendimento organizado por data e hora
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }

  //Read All by doctor in specific date
  async allByDoctorInDate(req, res){
    const currentini = new Date(req.body.ini);
    const currentfim = new Date(req.body.fim);
    await AttendanceModel.find({
      'id_crm' : {'$in' : req.params.id_crm},
      'dia': {'$gte': startOfDay(currentini), '$lte': endOfDay(currentfim)}
    })
    .populate('id_crm').populate('id_cpf')
    .sort('dia')//Atendimento organizado por data e hora
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }

    
    //Read by Id
    async id(req, res){
    await AttendanceModel.findById(req.params.id)
    .populate('id_crm').populate('id_cpf')
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

  
  //Read by today by Doctor by Patient in specific date
  async todayByDByPByInDate(req, res){
    const search_crm = await DoctorModel.findOne({'crm': req.body.crm});
    const search_cpf = await PatientModel.findOne({'cpf': req.body.cpf});

    if(!search_crm){
      return res.status(404).json({error: 'CRM inválido!'});
    }
    if(!search_cpf){
      return res.status(404).json({error: 'CPF inválido!'});
    }

    const currentdia = new Date(req.body.dia);
    
    await AttendanceModel.find({
      'dia': {'$gte': startOfDay(currentdia), '$lte': endOfDay(currentdia)},
      'id_crm': search_crm._id,
      'id_cpf': search_cpf._id
    })
    .populate('id_crm').populate('id_cpf')
    .sort('dia')//Atendimento organizado por data e hora
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
    }
}

module.exports = new AttendanceController();
