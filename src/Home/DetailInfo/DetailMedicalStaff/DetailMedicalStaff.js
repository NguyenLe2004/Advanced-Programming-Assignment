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
    if (!schedule.length) return "Mới khởi tạo"
    const curDate = moment(moment().format("DD-MM-YYYY"),"DD-MM-YYYY");
    const curTime = moment(moment().format("HH-mm"),"HH:mm");
    let status="Sẵn sàng";
    for (let i =0 ; i<schedule.length; ++i) {
      const obj = schedule[i];
      const dateBegin = moment(obj.dateBegin,"DD-MM-YYYY");
      const dateEnd = moment(obj.dateEnd,"DD-MM-YYYY");

      if(!dateBegin.isSame(curDate) && !dateEnd.isSame(curDate)) continue;
      if(obj.description ==="Nghỉ phép"){
        return  "Nghỉ phép";
      }
      if(moment(obj.timeBegin,"HH:mm").isSameOrBefore(curTime) && moment(obj.timeEnd,"HH:mm").isSameOrAfter(curTime)) {
        return "Đang làm việc";
      }
    }
    return status;
  }

  useEffect(() => {
    const getMedicalStaff = async () => {
      try {
        let response = await axios.get("http://localhost:8080/v1/specialists/" + id);
        const schedule = await axios.get(`http://localhost:8080/v1/specialists/${id}/schedules`)
        response.data.schedule = schedule.data;
          let medicalStaffDataWithStatus = response.data
          if(medicalStaffDataWithStatus.schedule.length) {
            medicalStaffDataWithStatus.schedule=medicalStaffDataWithStatus.schedule.sort((a, b) => {
              const dateA = moment(a.dateBegin, "DD-MM-YYYY");
              const dateB = moment(b.dateBegin, "DD-MM-YYYY");
              if (dateA.isSame(dateB)) {
                return moment(b.timeBegin, "HH:mm").diff(moment(a.timeBegin, "HH:mm"));
              }
              // console.log("diff here",dateA.diff(dateB))
              return dateB.diff(dateA);
            }); 
          }
          medicalStaffDataWithStatus.status = getMedicalStaffStatus(medicalStaffDataWithStatus.schedule);
        
        setMedicalStaff(medicalStaffDataWithStatus);
        console.log(medicalStaffDataWithStatus)
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