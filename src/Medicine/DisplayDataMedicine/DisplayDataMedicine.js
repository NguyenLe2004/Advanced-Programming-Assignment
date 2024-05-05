import React, { useState,useEffect} from 'react';
import "./DisplayDataMedicine.css"
import TableComponent from './TableComponent/TableComponent';
import StatusStat from './StatusStat/StatusStat';
import FilterAndSearch from './FilterAndSearch/FilterAndSearch';

const DisplayDataMedicine = ({dataMedicine, role}) => {
  const [dataMedicineDisplay, setDataMedicineDisplay] = useState([]);

  useEffect(() => {
    setDataMedicineDisplay(dataMedicine);
  },[dataMedicine]);

  return ( 
        <div className='main-page'>
          <StatusStat dataMedicine ={dataMedicine} role = {role}/>
          <FilterAndSearch setDataMedicineDisplay = {setDataMedicineDisplay} dataMedicineDisplay = {dataMedicineDisplay} />
        {Object.keys(dataMedicineDisplay).length !== 0 ? (
            <TableComponent dataMedicineDisplay = {dataMedicineDisplay} setDataMedicineDisplay={setDataMedicineDisplay} role = {role} />
          ):(
            <div> NO DATA AVAILABLE </div>
          )}
    </div>


  );
};

export default DisplayDataMedicine;
