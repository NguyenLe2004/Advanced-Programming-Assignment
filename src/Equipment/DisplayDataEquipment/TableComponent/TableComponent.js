import React, {  useEffect, useState } from 'react';
import DisplayMoreInfo from './DisplayMoreInfo/DisplayMoreInfo';
import { Button } from 'react-bootstrap';
import { faAnglesLeft, faAnglesRight,faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./TableComponent.css";

const TableComponent = ({dataEquipmentDisplay,setDataEquipmentDisplay}) => {
  const rowsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(Object.keys(dataEquipmentDisplay).length / rowsPerPage);
  const [currentID,setCurrentID] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirect, setSortDirect] = useState("desc");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goToPreviousPage = () => {
    console.log("cur page",currentPage);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getEquipmentStatusClass = (status) => {
    switch (status) {
      case "Đang điều trị" : 
        return "treating";
      case "Hoàn thành điều trị" :
        return "complete-treat";
      default :
        return "no-treat"
    }
  }



  const  handleClickRow = (id) => {
    setCurrentID(id);
    handleShow();
  }

  const handleSort = (colName) => {
    if (colName === sortColumn) {
      setSortDirect(sortDirect === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(colName);
      setSortDirect('desc');
    }
  }

  useEffect(() => {
    if (!dataEquipmentDisplay || !sortColumn) {
      return;
    }
    const arr = Object.entries(dataEquipmentDisplay);
    arr.sort((a, b) => {
      const sortValueA = a[1][sortColumn];
      const sortValueB = b[1][sortColumn];
      if (sortColumn === "age") {
        return sortDirect === "desc" ?sortValueB - sortValueA: sortValueA - sortValueB
      }
      return sortDirect === "desc" ? sortValueB.localeCompare(sortValueA) : sortValueA.localeCompare(sortValueB);
    });
    console.log("sorted arr" , arr);
    console.log(dataEquipmentDisplay)
    let sortedArr = [];
    arr.forEach(item => {
      sortedArr.push(item[1]);
    })
    setDataEquipmentDisplay(sortedArr);
  }, [sortColumn, sortDirect]);

  useEffect(() => {
    setCurrentID(""); // Reset the current ID when the page changes
  }, [currentPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const currentPageDataEquipment = dataEquipmentDisplay.slice(startIndex,endIndex);
  return (
    <div>
      <DisplayMoreInfo show = {show} handleClose = {handleClose} dataMoreInfo = {dataEquipmentDisplay[currentID]} />
      <div className='outer-table'>
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th className='sort-col'  onClick={() => handleSort('lastMiddleName')}>
                <span>Họ và tên đệm</span>
                <span className='sort-icon'>
                  <FontAwesomeIcon
                      icon={
                        sortColumn === 'lastMiddleName'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    />
                </span>
              </th>
              <th className='sort-col'   onClick={() => handleSort('gender')}>
                <span>Giới tính</span>
                <span className='sort-icon'>                
                <FontAwesomeIcon
                      icon={
                        sortColumn === 'gender'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    /></span>
              </th>
              <th>Chẩn đoán</th>

              <th className='sort-col' onClick={() => handleSort('status')} >
                <span>Trạng thái</span>
                <span className='sort-icon'>
                <FontAwesomeIcon
                      icon={
                        sortColumn === 'status'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    />
              </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageDataEquipment.map((obj,index) => (
              <tr key={obj.citizenID} onClick={() => handleClickRow(
                currentPage > 1 ? index + rowsPerPage*(currentPage-1) : index
              )} >
                <td>{obj.name}</td>
                <td >{obj.arrivalDate} {obj.arrivalTime}</td>
                <td>{obj.departureDate} {obj.departureTime}</td>
                <td>{obj.expireDate}</td>
                <td>{obj.amount}</td>
                <td className='status-block' >
                  <div className={`status ${getEquipmentStatusClass(obj.status)}`}>
                    bro bro bro
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination'>
        <Button className='table-num-btn' onClick={goToPreviousPage} disabled={currentPage<=1}><FontAwesomeIcon className='icon-arrow-table' icon={faAnglesLeft} /></Button>
        <span>{currentPage}</span>
        <Button className='table-num-btn' onClick={goToNextPage} disabled={currentPage>=totalPage}><FontAwesomeIcon className='icon-arrow-table' icon={faAnglesRight} /></Button>
      </div>
    </div>
  );
};

export default TableComponent;