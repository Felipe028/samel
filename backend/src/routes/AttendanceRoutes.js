const express = require('express');
const router = express.Router();

const AttendanceController = require('../controllers/AttendanceController');

//Create Attendance
router.post('/add', AttendanceController.create);
//Update Attendance
router.put('/:id', AttendanceController.update);
//Delete Attendance
router.delete('/:id', AttendanceController.delete);
//Read All
router.get('/all', AttendanceController.all);
//Read today
router.get('/today', AttendanceController.today);
//Read All in specific date
router.get('/alldate/:ini/:fim', AttendanceController.allDate);
//Read by patient
router.get('/bypatient/:id_cpf', AttendanceController.byPatient);
//Read by doctor
router.get('/bydoctor/:id_crm', AttendanceController.byDoctor);
//Read today by doctor
router.get('/todaybydoctor/:id_crm', AttendanceController.todayByDoctor);
//Read All by doctor in specific date
router.get('/allbydoctorindate/:id_crm', AttendanceController.allByDoctorInDate);
//Read by Id
router.get('/id/:id', AttendanceController.id);
//Read by today by Doctor by Patient in specific date
router.get('/allbydoctorbypatientindate', AttendanceController.todayByDByPByInDate);


module.exports = router;
