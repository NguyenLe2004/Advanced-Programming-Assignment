import React, {useState,useEffect} from 'react'
import Search from './Search/Search'
import axios from 'axios'
import DataTable from './DataTable/DataTable'
import "./Specialist.css"

const Specialist = () => {

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const getAllSpecialist = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Specialist');
        console.log('call api', response.data);
        setJsonData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSpecialist();
  }, []);

  return (
    <div>
      <Search/>
      {jsonData && <DataTable jsonData={jsonData} />}
    </div>
  )
}

export default Specialist;