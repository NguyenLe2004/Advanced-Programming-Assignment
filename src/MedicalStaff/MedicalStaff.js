import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import DisplayDataMedicalStaff from './DisplayDataMedicalStaff/DisplayDataMedicalStaff'
import {useParams} from 'react-router-dom'
import TimeLine from './TimeLine/TimeLine'
import "./MedicalStaff.css"
import { dataMedicalStaffContext } from '../Provider/DataProvider'
const MedicalStaff = ({role}) => {
  const {position} = useParams();
  const {dataMedicalStaff,setDataMedicalStaff} = useContext(dataMedicalStaffContext);
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

  const getMedicalStaffAge = (dateOfBirth) =>{
    const currentYear = moment().year();
    const birthYear = moment(dateOfBirth,'DD - MM - YYYY').year();
    return currentYear - birthYear;
  }

  useEffect(() => {
    const getAllMedicalStaff = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/v1/specialists?position=` +  
        encodeURI(position === 'specialist' ? 'Bác sĩ' : position === 'nurse' ? 'Y tá' : 'Nhân viên hỗ trợ')
      );
        const dataWithStatusAndAge =await Promise.all(  await response.data.map(async item => {
          const age = getMedicalStaffAge(item.dateOfBirth);
          const response_schedule = await axios.get(`http://localhost:8080/v1/specialists/${item.id}/schedules`);
          // console.log(response_schedule.data)
          let schedule = response_schedule.data;
          schedule = schedule.sort((a, b) => {
            const dateA = moment(a.dateBegin, "DD-MM-YYYY");
            const dateB = moment(b.dateBegin, "DD-MM-YYYY");
            if (dateA.isSame(dateB)) {
              const timeA = moment(a.timeBegin, "HH:mm");
              const timeB = moment(b.timeBegin, "HH:mm");
              return timeA.diff(timeB);
            }
            return dateA.diff(dateB);
          });
          const status = getMedicalStaffStatus(schedule);
          return {...item ,status,age,schedule}; 
        }))
        setDataMedicalStaff(dataWithStatusAndAge);
      } catch (error) {
        console.log(error); 
      }
    };
    getAllMedicalStaff();
  }, []);

  return (
    <div>
      <DisplayDataMedicalStaff dataMedicalStaff = {dataMedicalStaff} position = {position} role = {role}/>
      <div style={{height:"100vh",marginTop:"45%"}}>
        <div className="time-line">
        <TimeLine dataMedicalStaff = {dataMedicalStaff} />
        </div>
      </div>
    </div>
  )
}

export default MedicalStaff;