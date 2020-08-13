const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

//Importando Rotas
const DoctorRoutes = require('./routes/DoctorRoutes');
const PatientRoutes = require('./routes/PatientRoutes');
const AttendanceRoutes = require('./routes/AttendanceRoutes');

app.use('/doctor', DoctorRoutes);
app.use('/patient', PatientRoutes);
app.use('/attendance', AttendanceRoutes);

		
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('Servidor rodando na porta %s', port)
});