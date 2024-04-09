import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { faKitMedical,faMicroscope } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./TreatProcess.css"
const TreatProcess = ({treatProcess}) => {
    const [medStaff, setMedStaff] = useState([]);

    useEffect(() => {
        if(!treatProcess) return;
        const uniqueDoctorIds = new Set();
        treatProcess.forEach(obj => {
            uniqueDoctorIds.add(obj.medicalStaffID);
        });
        const queryString = Array.from(uniqueDoctorIds) 
            .map(id => `id=${id}`)
            .join('&')
        console.log("string query here",queryString)
        const getMedStaff = async () => {
            try {
                const response = await axios.get("http://localhost:3000/MedicalStaff?" + queryString);
                console.log("api call",response.data)
                setMedStaff(response.data);
              } catch (error) {
                console.log(error); 
              }
        }
        getMedStaff();
    },[treatProcess])
    if (!treatProcess) return;
    const getMedStaffByID = (id) => {
        if (!medStaff) return null;
        let medStaffName = null;
        let medStaffPosition = null;
        medStaff.forEach((obj) => {
            if (obj.id === id) {
              medStaffName = obj.name;
              medStaffPosition = obj.position;
            }
        });
        return (
          <div>
            <span>{medStaffPosition}</span>
             <span><a href={`/specialist/${id}`}>  {medStaffName}</a></span>
          </div>
        )
    }
  return (
    <div>
      {treatProcess.map((treatment, index) => (
        <div className='treat-circle-block'> 
            <div className={`circle circle-${
              moment(treatment.dateEnd,"DD-MM-YYYY") < moment() ? ( index==0 ? "complete":"complete-task") : "on-going"
            }`}> 
            {!treatment.title.includes("Xét nghiệm") ? (
              <FontAwesomeIcon className='icon' icon={faKitMedical} />
            ):(
              <FontAwesomeIcon className='icon' icon={faMicroscope} />
            ) }
            </div>
            <div key={index} className='treat-block'>
              <div className='room-date'> 
                <div className='date'>{treatment.dateBegin.split('-').join('/')}  -  {treatment.dateEnd.split('-').join('/')}</div>
                <div className='room'>{treatment.room}</div> 
              </div>
              <div className='title'>{treatment.title}</div>
              <div className='specialist'>
                {getMedStaffByID(treatment.medicalStaffID)}
              </div>
              <div> 
                <div className='description'> {treatment.description} </div>
              </div>
            </div>
        </div>

      ))}
    </div>
  )
}

export default TreatProcess;