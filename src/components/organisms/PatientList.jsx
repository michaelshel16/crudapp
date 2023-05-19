import React, { useState } from 'react';
import "./PatientList.css";
import PatientData from '../molecules/PatientData';
import axios from 'axios';
import EditPatientData from '../molecules/EditPatientData';

function PatientList({patientList,deletePatient,updatePatientfindId,updatePatient}) {
  
return (
    
       <div className='patientlist-container'>
        <div>
          {
            patientList.length===0?<h3>No records found</h3>:
            
            patientList.map((patient,index)=>
            (   patient.editing?<EditPatientData key={index} updatePatient={updatePatient}/>:
                
                <PatientData key={index}
                patientName            =  {patient.name}
                admissionReason        =  {patient.admissionReason}
                admissionDate          =  {patient.admissionDate}
                patientId              =  {patient._id}
                deletePatient          =  {deletePatient}
                updatePatientfindId    =  {updatePatientfindId} />
            )
            
              
            )
          }

           </div>
       </div>
    
  )
}

export default PatientList
