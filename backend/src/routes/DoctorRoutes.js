const express = require('express');
const router = express.Router();

const DoctorController = require('../controllers/DoctorController');

//Create Doctor form
router.post('/add', DoctorController.create);
//Update Doctor
router.put('/:id', DoctorController.update);
//Delete Doctor
router.delete('/:id', DoctorController.delete);
//Read All
router.get('/all', DoctorController.all);
//Read by Name
router.get('/name/:name', DoctorController.name);
//Read by Id
router.get('/id/:id', DoctorController.id);
//Read by CRM
router.get('/crm/:crm', DoctorController.crm);

module.exports = router;
