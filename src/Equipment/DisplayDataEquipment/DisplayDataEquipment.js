import React, { useState, useRef,useEffect, useContext} from 'react';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "./DisplayDataEquipment.css"
import TableComponent from './TableComponent/TableComponent';
import StatusStat from './StatusStat/StatusStat';
import FilterAndSearch from './FilterAndSearch/FilterAndSearch';

const DisplayDataEquipment = ({dataEquipment, role}) => {
  const [dataEquipmentDisplay, setDataEquipmentDisplay] = useState([]);
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
      setDataEquipmentDisplay(dataEquipment);
      return;
    }
    const searchResults = Object.keys(dataEquipment)
    .filter(key => dataEquipment[key].name === inputValue)
    .map(key => dataEquipment[key]);
    if (searchResults) {
      setDataEquipmentDisplay(searchResults);
    }
    else{
      setInputValue("");
      setSearchError("Không tìm thấy")
    }
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
    setDataEquipmentDisplay(dataEquipment);
  },[dataEquipment]);

  return (
        <div className='main-page'> 
          <StatusStat dataEquipment ={dataEquipment} role = {role}/> 
           
        <FilterAndSearch setDataEquipmentDisplay = {setDataEquipmentDisplay} dataEquipment = {dataEquipment} />
        {Object.keys(dataEquipmentDisplay).length !== 0 ? (
            <TableComponent dataEquipmentDisplay = {dataEquipmentDisplay} setDataEquipmentDisplay={setDataEquipmentDisplay} role={role} />
          ):(
            <div> NO DATA AVAILABLE </div>
          )}
    </div>


  );
};

export default DisplayDataEquipment;
