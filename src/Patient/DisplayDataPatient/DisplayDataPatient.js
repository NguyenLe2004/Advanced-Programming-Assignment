import React, { useState, useRef,useEffect} from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./DisplayDataPatient.css"
import TableComponent from './TableComponent/TableComponent';

const DisplayDataPatient = ({allDataPatient}) => {
  const [dataPatientDisplay, setDataPatientDisplay] = useState("");
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
    setSearchError("");
    if (inputValue === ""){
      setDataPatientDisplay(dataPatientDisplay);
      return;
    }
    if (inputValue.length === 12 && /^\d+$/.test(inputValue)) {
      setDataPatientDisplay(dataPatientDisplay[inputValue] != null ? { [inputValue] : dataPatientDisplay[inputValue]} : {});
      return;
    }
    setSearchError("Căn cước công dân không hợp lệ");
    
  }
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDataPatientDisplay(allDataPatient);
    console.log(dataPatientDisplay)
  },[allDataPatient]);

  return (
    <div>
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
        <Alert key={'danger'} variant={'danger'} className='search-error'>
          {searchError}
        </Alert>
        )}
        {Object.keys(dataPatientDisplay).length !== 0 ? (
            <TableComponent dataPatientDisplay = {dataPatientDisplay}  />
          ):(
            <div> NO DATA AVAILABLE </div>
          )}
    </div>
  );
};

export default DisplayDataPatient;
