import React, { useState, useRef,useEffect, useContext} from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./DisplayDataPatient.css"
import TableComponent from './TableComponent/TableComponent';
import StatusStat from './StatusStat/StatusStat';

const DisplayDataPatient = ({dataPatient}) => {
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
          <StatusStat treatProcess = {Object.values(dataPatient).map(patient =>  patient.treatProcess)}/>
            <span className={`searchBlock ${isClicked ? 'active' : ''}`} ref={searchBlockRef}>
              <input 
                placeholder='Nhập số căn cước công dân' 
                className={`searchInput ${isClicked ? 'active' : ''}`} 
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value.replace(/\s/g, ""))}
                onKeyDown={handleKeyPress}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`searchIcon ${isClicked ? 'active' : ''}`}
                onClick={handleIconClick}
              />
            </span>

        {searchError && (
        <Alert variant={'danger'} className='search-error' onClose={() => setSearchError("")} dismissible>
          {searchError}
        </Alert>
        )}
        {Object.keys(dataPatientDisplay).length !== 0 ? (
            <TableComponent dataPatientDisplay = {dataPatientDisplay} setDataPatientDisplay={setDataPatientDisplay}  />
          ):(
            <div> NO DATA AVAILABLE </div>
          )}
    </div>


  );
};

export default DisplayDataPatient;