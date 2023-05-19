import React, { useState } from 'react';
import "./PatientData.css";
import 'react-calendar/dist/Calendar.css';
import "./PatientData.css";


function PatientData({patientName,admissionReason,admissionDate,patientId,deletePatient,updatePatientfindId}) {

  return (

      
  
      <div className='patientdata-container'>
        
        <div className='patientdata-name'>
          Name:{patientName}

        </div>
        <div className='admission-reason'>
            Admission reason:{admissionReason}
        </div>
        <div className='admission-date'>
            Admission date:{admissionDate}
        </div>
        <div>
          <button onClick={()=>deletePatient(patientId)}>deletePatient</button>
          <button onClick={()=>updatePatientfindId(patientId)}>updatePatient</button>
          
        </div>
        
       
        
        </div>
        
        
      
    
  )}


export default PatientData
