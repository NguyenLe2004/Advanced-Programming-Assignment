import React, { useState, useRef,useEffect, useContext} from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./DisplayDataPatient.css"
import TableComponent from './TableComponent/TableComponent';
import StatusStat from './StatusStat/StatusStat';
import FilterAndSearch from './FilterAndSearch/FilterAndSearch';

const DisplayDataPatient = ({dataPatient, role}) => {
  const [dataPatientDisplay, setDataPatientDisplay] = useState([]);
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
      setDataPatientDisplay(dataPatient);
      return;
    }
    if (inputValue.length === 12 && /^\d+$/.test(inputValue)) {
      const searchID = Object.keys(dataPatient).find(key => dataPatient[key].citizenID == inputValue);
      if (searchID) {
        console.log(dataPatient[searchID])
        setDataPatientDisplay([dataPatient[searchID]]);
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
    setDataPatientDisplay(dataPatient);
  },[dataPatient]);

  return (
        <div className='main-page'>
          <StatusStat dataPatient = {dataPatient}/>
        <FilterAndSearch setDataPatientDisplay = {setDataPatientDisplay} dataPatient = {dataPatient} />
        
        {Object.keys(dataPatientDisplay).length !== 0 ? (
            <TableComponent dataPatientDisplay = {dataPatientDisplay} setDataPatientDisplay={setDataPatientDisplay} role = {role} />
          ):(
            <div> NO DATA AVAILABLE </div>
          )}
    </div>


  );
};

export default DisplayDataPatient;