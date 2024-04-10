import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import DisplayDataPatient from './DisplayDataPatient/DisplayDataPatient'
import { dataPatientContext } from '../Provider/DataProvider'
const Patient = () => {
  const {dataPatient,setDataPatient} = useContext(dataPatientContext);

  const getPatientStatus = (treatProcess) => {
    const length = treatProcess.length;
    if (length === 0) {
        return "Chưa điều trị";
    }
    const currentDate = moment();
    const lastTreatDay = moment(treatProcess[0].dateEnd, 'DD/MM/YYYY');
    if (lastTreatDay < currentDate) {
        return "Hoàn thành điều trị";
    }
    return "Đang điều trị";
  }

  const getPatientAge = (dateOfBirth) =>{
    const currentYear = moment().year();
    const birthYear = moment(dateOfBirth,'DD-MM-YYYY').year();
    return currentYear - birthYear;
  }

  useEffect(() => {
    const getAllPatient = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Patient');
        const dataWithStatusAndAge = response.data.map(item => {
          const age = getPatientAge(item.dateOfBirth);
          const treatProcess = item.treatProcess;
          treatProcess.sort((a, b) => {
            const dateA = moment(a.dateBegin, "DD-MM-YYYY");
            const dateB = moment(b.dateBegin, "DD-MM-YYYY");
            if (dateA.isSame(dateB)) {
              return moment(b.dateEnd, "DD-MM-YYYY") - moment(a.dateEnd, "DD-MM-YYYY");
            }
            return dateB - dateA;
          });
          const status = getPatientStatus(treatProcess);


          return {...item ,status,age,treatProcess};
        })
        setDataPatient(dataWithStatusAndAge);
      } catch (error) {
        console.log(error); 
      }
    };
    getAllPatient();
  }, []);

  return (
    <div>
      <DisplayDataPatient dataPatient = {dataPatient}/>
    </div>
  )
}

export default Patient;