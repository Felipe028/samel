const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/PatientController');

//Create Patient form
router.post('/add', PatientController.create);
//Update Patient
router.put('/:id', PatientController.update);
//Delete Patient
router.delete('/:id', PatientController.delete);
//Read All
router.get('/all', PatientController.all);
//Read by Name
router.get('/name/:name', PatientController.name);
//Read by Id
router.get('/id/:id', PatientController.id);
//Read by CRM
router.get('/cpf/:cpf', PatientController.cpf);

module.exports = router;
