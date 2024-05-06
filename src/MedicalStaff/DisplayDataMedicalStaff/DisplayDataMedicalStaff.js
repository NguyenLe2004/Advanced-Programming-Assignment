import React, { useState, useRef,useEffect, useContext} from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./DisplayDataMedicalStaff.css"
import TableComponent from './TableComponent/TableComponent';
import StatusStat from './StatusStat/StatusStat';
import FilterAndSearch from './FilterAndSearch/FilterAndSearch'

const DisplayDataMedicalStaff = ({dataMedicalStaff,position, role}) => {
  const [dataMedicalStaffDisplay, setDataMedicalStaffDisplay] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchError, setSearchError] = useState("");
  const searchBlockRef = useRef(null);
  const handleIconClick = () => {
    setIsClicked(true);
    submitSearch();
  };

  const handleClickOutside = (event) => {
    if (searchBlockRef.current && !searchBlockRef.current.contains(event.target)) {
      setIsClicked(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && isClicked) {
      submitSearch();
    } 
  };
  const submitSearch = () => {
    hideError();
    if (inputValue === ""){
      setDataMedicalStaffDisplay(dataMedicalStaff);
      return;
    }
    if (inputValue.length === 12 && /^\d+$/.test(inputValue)) {
      const searchID = Object.keys(dataMedicalStaff).find(key => dataMedicalStaff[key].citizenID == inputValue);
      if (searchID) {
        setDataMedicalStaffDisplay([dataMedicalStaff[searchID]]);
      }
      else{
        setInputValue("");
        setSearchError("Không tìm thấy bệnh nhân");
      }
      return;
    }
    setInputValue("");
    setSearchError("Căn cước công dân không hợp lệ");
  }

  const hideError = () => { 
    setSearchError("");
  }
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDataMedicalStaffDisplay(dataMedicalStaff);
  },[dataMedicalStaff]);

  return (
        <div className='main-page'>
          <StatusStat dataMedicalStaff={dataMedicalStaff} position={position} role={role}/>
            
          <FilterAndSearch setDataMedicalStaffDisplay = {setDataMedicalStaffDisplay} dataMedicalStaff = {dataMedicalStaff} position={position}/>
        {Object.keys(dataMedicalStaffDisplay).length !== 0 ? (
            <TableComponent dataMedicalStaffDisplay = {dataMedicalStaffDisplay} setDataMedicalStaffDisplay={setDataMedicalStaffDisplay} role = {role} />
          ):(
            <div> NO DATA AVAILABLE </div>
          )}
    </div>


  );
};

export default DisplayDataMedicalStaff;