import React, {useState,useEffect, useContext} from 'react'
import Search from './DisplayDataPatient/DisplayDataPatient'
import axios from 'axios'
import { dataDisplayPatientContext, dataPatientContext } from '../DataControl/DataPatientProvider'

import DisplayDataPatient from './DisplayDataPatient/DisplayDataPatient'

const Patient = () => {
  const {dataPatientDisplay,setDataPatientDisplay} = useContext(dataDisplayPatientContext);
  const {setDataPatient } = useContext(dataPatientContext);
  useEffect(() => {
    const getAllPatient = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Patient');
        setDataPatient(response.data);
        setDataPatientDisplay(response.data);
        console.log(dataPatientDisplay);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPatient();
  }, []);

  return (
    <DisplayDataPatient/>
  )
}

export default Patient;