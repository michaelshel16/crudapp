import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./EditPatientData.css";

function EditPatientData({updatePatient}) {

 const [ patientData,setpatientData] = useState(
  {
    name :'',
    admissionReason : '',
    admissionDate   : new Date(),
    
  })

  const onChangeHandler = (event) =>
  {
     setpatientData(()=>({...patientData,[event.target.name]:event.target.value}))

     
  }
  
  const handleSubmit = (event) =>
  {
    
    console.log(patientData);
    updatePatient(patientData);
  }


  return (
    
       <div className='patientdata-container' >
        
        <div className='patientdata-name'>
          Name:<input placeholder='Enter name' name='name' onChange={onChangeHandler}/>

        </div>
        <div className='admission-reason'>
            Admission reason:<input placeholder='Enter admission reason' name='admissionReason' onChange={onChangeHandler}/>
        </div>
        <div className='admission-date'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker  onChange={(newvalue)=>onChangeHandler} name='admissionDate'/>
            </LocalizationProvider>
        </div>
        <div>
          <button  onClick={handleSubmit}>Submit</button>
         </div>
         </div>
  )
}

export default EditPatientData
