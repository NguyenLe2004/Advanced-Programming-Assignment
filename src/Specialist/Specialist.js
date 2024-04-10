import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import DisplayDataSpecialist from './DisplayDataSpecialist/DisplayDataSpecialist'
import { dataSpecialistContext } from '../Provider/DataProvider'
const Specialist = () => {
  const {dataSpecialist,setDataSpecialist} = useContext(dataSpecialistContext);

  const getSpecialistStatus = (schedule) => {
    const curDate = moment().format("DD-MM-YYYY");
    const curTime = moment().format("HH-mm");
    let status="Sẵn sàng";
    schedule.forEach(obj => {
      const date = moment(obj.date,"DD-MM-YYYY");
      if(date < curDate) return status;
      if(date === curDate && schedule.timeBegin <= curTime && schedule.timeEnd>=curTime ) {
        return "Đang làm việc";
      }
    });
    return status;
  }

  const getSpecialistAge = (dateOfBirth) =>{
    const currentYear = moment().year();
    const birthYear = moment(dateOfBirth,'DD - MM - YYYY').year();
    return currentYear - birthYear;
  }

  useEffect(() => {
    const getAllSpecialist = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/MedicalStaff?position=${encodeURIComponent("Bác sĩ")}`);
        console.log(response.data)
        const dataWithStatusAndAge = response.data.map(item => {
          const age = getSpecialistAge(item.dateOfBirth);
          const schedule = item.schedule;
          schedule.sort((a, b) => {
            const dateA = moment(a.date, "DD-MM-YYYY");
            const dateB = moment(b.date, "DD-MM-YYYY");
            if (dateA.isSame(dateB)) {
              return moment(a.timeBegin, "HH-mm") - moment(b.timeBegin, "HH-mm");
            }
            return dateA - dateB;
          });
          const status = getSpecialistStatus(schedule);
          return {...item ,status,age,schedule};
        })
        console.log(dataWithStatusAndAge);
        setDataSpecialist(dataWithStatusAndAge);
      } catch (error) {
        console.log(error); 
      }
    };
    getAllSpecialist();
  }, []);

  return (
    <div>
      <DisplayDataSpecialist dataSpecialist = {dataSpecialist}/>
    </div>
  )
}

export default Specialist;