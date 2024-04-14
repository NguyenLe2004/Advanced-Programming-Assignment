import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import DisplayDataMedicalStaff from './DisplayDataMedicalStaff/DisplayDataMedicalStaff'
import {useParams} from 'react-router-dom'
import TimeLine from './TimeLine/TimeLine'
import "./MedicalStaff.css"
import { dataMedicalStaffContext } from '../Provider/DataProvider'
const MedicalStaff = () => {
  const {position} = useParams();
  const {dataMedicalStaff,setDataMedicalStaff} = useContext(dataMedicalStaffContext);
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

  const getMedicalStaffAge = (dateOfBirth) =>{
    const currentYear = moment().year();
    const birthYear = moment(dateOfBirth,'DD - MM - YYYY').year();
    return currentYear - birthYear;
  }

  useEffect(() => {
    const getAllMedicalStaff = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/MedicalStaff?position=${
          position==="specialist" ?  encodeURIComponent("Bác sĩ") : position ==="Nurse" ? encodeURIComponent("Y tá") : encodeURIComponent("Nhân viên hỗ trợ")
        }`);
        const dataWithStatusAndAge = response.data.map(item => {
          const age = getMedicalStaffAge(item.dateOfBirth);
          const schedule = item.schedule;
          schedule.sort((a, b) => {
            const dateA = moment(a.date, "DD-MM-YYYY");
            const dateB = moment(b.date, "DD-MM-YYYY");
            if (dateA.isSame(dateB)) {
              return moment(a.timeBegin, "HH-mm") - moment(b.timeBegin, "HH-mm");
            }
            return dateA - dateB;
          });
          const status = getMedicalStaffStatus(schedule);
          return {...item ,status,age,schedule};
        })
        setDataMedicalStaff(dataWithStatusAndAge);
      } catch (error) {
        console.log(error); 
      }
    };
    getAllMedicalStaff();
  }, []);

  return (
    <div>
      <DisplayDataMedicalStaff dataMedicalStaff = {dataMedicalStaff} position = {position}/>
      <div style={{height:"100vh",marginTop:"45%"}}>
        <div className="time-line">
        <TimeLine dataMedicalStaff = {dataMedicalStaff} />
        </div>
      </div>
    </div>
  )
}

export default MedicalStaff;