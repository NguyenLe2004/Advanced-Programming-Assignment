import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import InfoBlock from './InfoBlock/InfoBlock';
import UpdateBlock from './UpdateBlock/UpdateBlock';
import EducateInfoBlock from './EducateInfoBlock/EducateInfoBlock';
import InfoSchedule from './InfoSchedule/InfoSchedule';
import CertInfoBlock from './CertInfoBlock/CertInfoBlock';
import moment from 'moment';
import axios from 'axios';
import "./DetailMedicalStaff.css"



const DetailMedicalStaff = () => {
  const { id } = useParams();
  const [medicalStaff, setMedicalStaff] = useState({})
  const [isUpdate, setIsUpdate] = useState(false);

  const getMedicalStaffStatus = (schedule) => {
    const curDate = moment(moment().format("DD-MM-YYYY"),"DD-MM-YYYY");
    const curTime = moment(moment().format("HH-mm"),"HH:mm");
    let status="Sẵn sàng";
    schedule.forEach(obj => {
      const date = moment(obj.date,"DD-MM-YYYY");
      if(date < curDate) return ;
      if(obj.description ==="Nghỉ phép"){
        status = "Nghỉ phép";
        return;
      }
      if(date.isSame(curDate) && moment(obj.timeBegin,"HH:mm").isSameOrBefore(curTime) && moment(obj.timeEnd,"HH:mm").isSameOrAfter(curTime)) {
        status = "Đang làm việc";
        return;
      }
    });
    return status;
  }

  useEffect(() => {
    const getMedicalStaff = async () => {
      try {
        const response = await axios.get("http://localhost:3000/MedicalStaff?id=" + id);
          const medicalStaffDataWithStatus = response.data.map(item => {
          const schedule = item.schedule;
          schedule.sort((a, b) => {
            const dateA = moment(a.date, "DD-MM-YYYY");
            const dateB = moment(b.date, "DD-MM-YYYY");
            console.log("a and b : ",dateA, dateB)
            if (dateA.isSame(dateB)) {
              return moment(a.timeBegin, "HH:mm") - moment(b.timeBegin, "HH:mm");
            }
            return dateA - dateB;
          });
          const status = getMedicalStaffStatus(schedule);
          return {...item ,status,schedule};
        })
        console.log("after sort",medicalStaffDataWithStatus);
        setMedicalStaff(medicalStaffDataWithStatus[0]);
      } catch (error) {
        console.log(error); 
      }
    };
    getMedicalStaff();
  }, []);
  return (
    <div className='main-page-detail'>
      <div className='info-block'>
        <span className='info'>
          <span className='pen-to-square-icon' ><FontAwesomeIcon onClick={() => setIsUpdate((prevState) => !prevState)} icon={faPenToSquare} /></span>
          <div className='avatar' >{medicalStaff.firstName? medicalStaff.firstName.charAt(0) + medicalStaff.lastMiddleName.charAt(0) : null}</div>
          {isUpdate?  
            <UpdateBlock medicalStaff = {medicalStaff} /> : 
            <InfoBlock medicalStaff = {medicalStaff}/>}
        </span>
        <span className='med-info'>
            <EducateInfoBlock medicalStaff={medicalStaff}/>
            <CertInfoBlock medicalStaff={medicalStaff} />
        </span> 
      </div>
      <div className='treat-page'>
          <InfoSchedule medicalStaff={medicalStaff} />
      </div>
    </div>

  )
}

export default DetailMedicalStaff