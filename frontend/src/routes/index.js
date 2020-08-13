import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


import Doctor from '../views/Doctor';
import CreateDoctor from '../views/Doctor/create';
import UpdateDoctor from '../views/Doctor/update';
import DetailsDoctor from '../views/Doctor/details';

import Patient from '../views/Patient';
import CreatePatient from '../views/Patient/create';
import UpdatePatient from '../views/Patient/update';
import DetailsPatient from '../views/Patient/details';

import Attendance from '../views/Attendance';
import CreateAttendance from '../views/Attendance/create';
import DetailsAttendance from '../views/Attendance/details';
import DetaillsAttendance from '../views/Attendance/details2';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Doctor}/>
        <Route path="/doctor" exact component={Doctor}/>
        <Route path="/doctor/add" exact component={CreateDoctor}/>
        <Route path="/doctor/:id" exact component={UpdateDoctor}/>
        <Route path="/doctor/details/:id" exact component={DetailsDoctor}/>

        <Route path="/patient" exact component={Patient}/>
        <Route path="/patient/add" exact component={CreatePatient}/>
        <Route path="/patient/:id" exact component={UpdatePatient}/>
        <Route path="/patient/details/:id" exact component={DetailsPatient}/>

        <Route path="/attendance" exact component={Attendance}/>
        <Route path="/attendance/add" exact component={CreateAttendance}/>
        <Route path="/attendance/details/:id" exact component={DetailsAttendance}/>
        <Route path="/attendance/detaills/:id" exact component={DetaillsAttendance}/>
      </Switch>
    </BrowserRouter>
  )
}
