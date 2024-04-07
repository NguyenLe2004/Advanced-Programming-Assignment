import React, {useState,useEffect} from 'react'
import Search from './Search/Search'
import axios from 'axios'
import DataTable from './DataTable/DataTable'
import "./SuportStaff.css"

const SuportStaff = () => {

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const getAllSuportStaff = async () => {
      try {
        const response = await axios.get('http://localhost:3001/SuportStaff');
        console.log('call api', response.data);
        setJsonData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSuportStaff();
  }, []);

  return (
    <div>
      <Search/>
      {jsonData && <DataTable jsonData={jsonData} />}
    </div>
  )
}

export default SuportStaff;