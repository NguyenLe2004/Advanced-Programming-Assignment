import React, { useState, useRef,useEffect, useContext} from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./DisplayDataMedicine.css"
import TableComponent from './TableComponent/TableComponent';
import StatusStat from './StatusStat/StatusStat';

const DisplayDataMedicine = ({dataMedicine}) => {
  const [dataMedicineDisplay, setDataMedicineDisplay] = useState([]);
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
      setDataMedicineDisplay(dataMedicine);
      return;
    }
    else {
      const searchID = Object.keys(dataMedicine).find(key => dataMedicine[key].name == inputValue);
      if (searchID) {
        setDataMedicineDisplay([dataMedicine[searchID]]);
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
    setDataMedicineDisplay(dataMedicine);
  },[dataMedicine]);

  return (
        <div className='main-page'>
          <StatusStat dataMedicine ={dataMedicine} />
            <span className={`searchBlock ${isClicked ? 'active' : ''}`} ref={searchBlockRef}>
              <input 
                placeholder='Nhập tên thuốc' 
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

        {/* {searchError && (
        <Alert variant={'danger'} className='search-error' onClose={() => setSearchError("")} dismissible>
          {searchError}
        </Alert>
        )} */}
        {Object.keys(dataMedicineDisplay).length !== 0 ? (
            <TableComponent dataMedicineDisplay = {dataMedicineDisplay} setDataMedicineDisplay={setDataMedicineDisplay}  />
          ):(
            <div> NO DATA AVAILABLE </div>
          )}
    </div>


  );
};

export default DisplayDataMedicine;
