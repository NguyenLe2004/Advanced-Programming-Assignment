import React, {useState,useEffect} from 'react'
import Search from './Search/Search'
import axios from 'axios'
import DataTable from './DataTable/DataTable'
import "./Medicine.css"

const Medicine = () => {

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const getAllMedicine = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Medicine');
        console.log('call api', response.data);
        setJsonData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllMedicine();
  }, []);

  return (
    <div>
      <Search/>
      {jsonData && <DataTable jsonData={jsonData} />}
    </div>
  )
}

export default Medicine;