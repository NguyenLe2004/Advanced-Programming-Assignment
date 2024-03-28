import React, {useState,useEffect} from 'react'
import Search from './Search/Search'
import axios from 'axios'
import DataTable from './DataTable/DataTable'
import "./Patient.css"

const Patient = () => {

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const getAllPatient = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Patient');
        console.log('call api', response.data);
        setJsonData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPatient();
  }, []);

  return (
    <div>
      <Search/>
      {jsonData && <DataTable jsonData={jsonData} />}
    </div>
  )
}

export default Patient;