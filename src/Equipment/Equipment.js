import React, {useState,useEffect} from 'react'
import Search from './Search/Search'
import axios from 'axios'
import DataTable from './DataTable/DataTable'
import "./Equipment.css"

const Equipment = () => {

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const getAllEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Equipment');
        console.log('call api', response.data);
        setJsonData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllEquipment();
  }, []);

  return (
    <div>
      <Search/>
      {jsonData && <DataTable jsonData={jsonData} />}
    </div>
  )
}

export default Equipment;