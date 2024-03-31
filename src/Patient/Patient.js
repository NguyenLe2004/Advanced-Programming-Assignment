import React, {useEffect, useState} from 'react'
import axios from 'axios'
import DisplayDataPatient from './DisplayDataPatient/DisplayDataPatient'

const Patient = () => {
  const [allDataPatient, setAllDataPatient] = useState({});
  useEffect(() => {
    const getAllPatient = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Patient');
        setAllDataPatient(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error); 
      }
    };
    getAllPatient();
  }, []);

  return (
    <div>
      <DisplayDataPatient allDataPatient = {allDataPatient}/>
    </div>
  )
}

export default Patient;