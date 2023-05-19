import React, { useState,useEffect } from 'react';
import PatientList from '../organisms/PatientList.jsx';
import axios from 'axios';


import "./Home.css";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function Home() {
  const [patientName,setpatientName]                             = useState('');
  const [ptadmissionReason,setptadmissionReason]                 = useState('');
  const [ptadmissionDate, setptadmissionDate]                    = useState(new Date());
  const [updateId,setUpdateId]                                   = useState('');
  const [patientList,setpatientList]                             = useState([]);
  const [temppatientList,settempPatientList]                     = useState([]);
  const [displayPatientList,setdisplayPatientList]               = useState([]);
  const  [isediting,setisediting]                                = useState(false);

  
  
   useEffect(()=>
   {
    axios.get("http://localhost:3001/hospital/v1/patients")
      .then(response=>
      {
          let patientList = [];
          for(let key in response.data)
          {
              patientList.push({...response.data[key]})
          }
          
          
          patientList = patientList.map((patient)=>Object.fromEntries(Object.entries(patient).map(([key,value])=>[key ,typeof value == 'string'?value.toLocaleLowerCase():value ])));
          setpatientList(patientList);
          console.log(patientList);
          settempPatientList(patientList);
         
          
      })
   },[]);
  
   
    const getallPatient = () => 
    {
        
        setdisplayPatientList(temppatientList);  

        
    }


    const addPatient = () =>
    {  
      
     
        axios.post("http://localhost:3001/hospital/v1/patients",
        {
          name:patientName,
          admissionReason:ptadmissionReason,
          admissionDate:ptadmissionDate,
          editing:false
        }).then(response=>
          {
            console.log("Patient"+response.statusText);
            alert("Patient created");
             settempPatientList([...temppatientList,{name:patientName,admissionReason:ptadmissionReason,
              admissionDate:ptadmissionDate,
              editing:false}]);
            
          })

      console.log(temppatientList);
       
      
    }

   const findPatient =() =>
    { let ptName = patientName.toLocaleLowerCase()
      let ptList = (temppatientList.filter( patient=>
      
       {return patient.name === ptName}
      ));
      setdisplayPatientList(ptList);
      
      console.log(displayPatientList);
    }

     
    const  deletePatient = (id) =>
    { 
      patientList.map((patient)=>
      {
        if(patient._id === id)
        axios.delete(`http://localhost:3001/hospital/v1/patients/${id}`)
        .then(response=>
          {
            console.log('Patient'+ response.statusText);
            alert("Patient records Deleted");
          })
      })

      settempPatientList([temppatientList.filter((patient)=>
      {
        return patient._id !== id
      })])
      
      
    }

    const updatePatientfindId = (id) =>
    {  
      console.log(id);
      setUpdateId(id);
       const ptList = temppatientList.filter((patient)=>
      {
        return patient._id === id
      }) 
      console.log(ptList);
      ptList.map((patient)=>
      {
        patient.editing = true;
      })

      setdisplayPatientList(ptList);
    }

    const updatePatient = (data) =>
    { console.log(data);
      axios.patch(`http://localhost:3001/hospital/v1/patients/${updateId}`,
      {
        name:data.name,
        admissionReason:data.admissionReason,
        admissionDate:data.admissionDate,
        editing:true
      })
    
       let ptList = [];
         ptList = temppatientList.map((patient)=>
       {
        if(patient._id === updateId)
        {
          return{...patient,name:data.name,
            admissionReason:data.admissionReason,
            admissionDate:data.admissionDate,
            editing:false};
        }
        
          else
          return patient;
        
       })
       
       settempPatientList(ptList);
       
       console.log(temppatientList);

        const List = temppatientList.filter((patient)=>
        {
          return patient._id === updateId
        })

        console.log(List);

        
      
    }
  return (



    <div>
         <div className='patient-input-container'>
             <div className='patient-input-name'>
             <input type ='text' placeholder='Enter patient name'value={patientName} onChange={(e)=>(setpatientName(e.target.value))}/>
             </div>
             <div className='patient-input-admission-reason'>
             <input type ='text' placeholder='Enter patient admission reason' value={ptadmissionReason} onChange={(e)=>(setptadmissionReason(e.target.value))}/>
             </div>
            
            
            <div className='patient-input-calendar'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker onChange={(newvalue)=>setptadmissionDate(newvalue)}/>
            </LocalizationProvider>
            </div>
            
           
             
          </div>

             <div className='patient-home-buttons'>
             
             
             <button onClick={()=> findPatient()}>findPatient</button>
             <button onClick={()=>getallPatient()}>Get all the patient</button>
             <button onClick={()=> addPatient()}>Add patient</button>
             </div>
             <PatientList patientList ={displayPatientList} deletePatient={deletePatient} updatePatientfindId = {updatePatientfindId} updatePatient = {updatePatient}
             />    
    </div>
  )
  }


export default Home
