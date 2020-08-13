import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import Header from './components/Header';
//import Doctor from './views/Doctor';
//import Create from './views/Doctor/create';
//import Details from './views/Doctor/details';

//import Patient from './views/Patient';
//import Create from './views/Patient/create';
//import Details from './views/Patient/details';

//import Attendance from './views/Attendance';
//import Create from './views/Attendance/create';
//import Details from './views/Attendance/details2';


//import Attendance from './views/Attendance';
//import Details from './views/Patient/details';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);


