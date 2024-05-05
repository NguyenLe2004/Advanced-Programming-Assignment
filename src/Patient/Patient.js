import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import DisplayDataPatient from './DisplayDataPatient/DisplayDataPatient'
import { dataPatientContext } from '../Provider/DataProvider'
const Patient = ({role}) => {
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
        const response = await axios.get('http://localhost:8080/v1/patients');
        console.log(response.data);
        const dataWithStatusAndAge = await Promise.all(response.data.map(async item => {
          const age = getPatientAge(item.dateOfBirth);
          const treatProcessPromise = await axios.get(`http://localhost:8080/v1/patients/${item.id}/treatProcess`);
          const treatProcess = treatProcessPromise.data;
          treatProcess.sort((a, b) => {
            const dateA = moment(a.dateBegin, "DD-MM-YYYY");
            const dateB = moment(b.dateBegin, "DD-MM-YYYY");
            if (dateA.isSame(dateB)) {
              return moment(b.dateEnd, "DD-MM-YYYY").diff(moment(a.dateEnd, "DD-MM-YYYY"));
            }
            return dateB.diff(dateA);
          });
          const status = getPatientStatus(treatProcess);

          return {...item ,status,age,treatProcess};
        }))
        setDataPatient(dataWithStatusAndAge);
        // console.log(dataWithStatusAndAge);
      } catch (error) {
        console.log(error); 
      }
    };
    getAllPatient();
  }, []);

  return (
    <div style={{height:"100vh"}}>
      <DisplayDataPatient dataPatient = {dataPatient} role = {role}/>
    </div>
  )
}

export default Patient;