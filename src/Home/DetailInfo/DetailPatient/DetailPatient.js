import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import InfoBlock from './InfoBlock/InfoBlock';
import UpdateBlock from './UpdateBlock/UpdateBlock';
import MedInfoBlock from './MedInfoBlock/MedInfoBlock';
import InfoTreat from './InfoTreat/InfoTreat';
import moment from 'moment';
import axios from 'axios';
import "./DetailPatient.css"



const DetailPatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({})
  const [isUpdate, setIsUpdate] = useState(false);

  const getPatientStatus = (treatProcess) => {
    const length = treatProcess.length;
    if (length === 0) {
        return "Chưa điều trị";
    }
    const currentDate = moment();
    const lastTreatDay = moment(treatProcess[length-1].dateEnd, 'DD/MM/YYYY');
    if (lastTreatDay < currentDate) {
        return "Hoàn thành điều trị";
    }
    return "Đang điều trị";
  }

  const handleClickUpdateIcon = () => {
    setIsUpdate(true);
  }

  useEffect(() => {
    const getPatient = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Patient/" + id);
        const status = getPatientStatus(response.data.treatProcess);
        const patientDataWithStatus = {
          ...response.data,
          status:getPatientStatus(response.data.treatProcess)
        }
        patientDataWithStatus.treatProcess.sort((a, b) => {
          const dateA = moment(a.dateBegin, "DD-MM-YYYY");
          const dateB = moment(b.dateBegin, "DD-MM-YYYY");
          if (dateA.isSame(dateB)) {
            return moment(b.dateEnd, "DD-MM-YYYY") - moment(a.dateEnd, "DD-MM-YYYY");
          }
          return dateB - dateA;
        });
        console.log(patientDataWithStatus)
        setPatient(patientDataWithStatus);
      } catch (error) {
        console.log(error); 
      }
    };
    getPatient();
  }, []);
  return (
    <div className='main-page-detail'>
      <div className='info-block'>
        <span className='info'>
          <span className='pen-to-square-icon' ><FontAwesomeIcon onClick={() => setIsUpdate((prevState) => !prevState)} icon={faPenToSquare} /></span>
          <div className='avatar' >{patient.firstName? patient.firstName.charAt(0) + patient.lastMiddleName.charAt(0) : null}</div>
          {isUpdate?  
            <UpdateBlock patient = {patient} /> : 
            <InfoBlock patient = {patient}/>}
        </span>
        <span className='med-info'>
            <MedInfoBlock patient={patient}/>
        </span>
      </div>
      <div className='treat-page'>
          <InfoTreat patient={patient} />
      </div>
    </div>

  )
}

export default DetailPatient