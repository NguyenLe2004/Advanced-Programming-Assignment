import React, {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import DisplayDataEquipment from './DisplayDataEquipment/DisplayDataEquipment'
const Equipment = () => {
  const [dataEquipment , setDataEquipment] = useState([])
  useEffect(() => {
      const getAllEquipment = async () => {
      try {
          const response = await axios.get('http://localhost:3000/Equipment');
          // treatProcess.sort((a, b) => {
          //     const dateA = moment(a.dateBegin, "DD-MM-YYYY");
          //     const dateB = moment(b.dateBegin, "DD-MM-YYYY");
          //     if (dateA.isSame(dateB)) {
          //     return moment(b.dateEnd, "DD-MM-YYYY") - moment(a.dateEnd, "DD-MM-YYYY");
          //     }
          //     return dateB - dateA;
          // });
          // const status = getEquipmentStatus(treatProcess);

          setDataEquipment(response.data);
      } catch (error) {
          console.log(error); 
      }
      };
      getAllEquipment();
  }, []); 
  return (
    <div>
      <DisplayDataEquipment dataEquipment={dataEquipment} />
    </div>
  )
}

export default Equipment;
