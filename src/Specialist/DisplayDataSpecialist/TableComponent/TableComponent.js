import React, {  useEffect, useState } from 'react';
import DisplayMoreInfo from './DisplayMoreInfo/DisplayMoreInfo';
import { Button } from 'react-bootstrap';
import { faAnglesLeft, faAnglesRight,faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./TableComponent.css";

const TableComponent = ({dataSpecialistDisplay,setDataSpecialistDisplay}) => {
  const rowsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(Object.keys(dataSpecialistDisplay).length / rowsPerPage);
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

  const getSpecialistStatusClass = (status) => {
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
    console.log("here" , id)
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
    if (!dataSpecialistDisplay || !sortColumn) {
      return;
    }
    const arr = Object.entries(dataSpecialistDisplay);
    arr.sort((a, b) => {
      const sortValueA = a[1][sortColumn];
      const sortValueB = b[1][sortColumn];
      return sortDirect === "desc" ? sortValueB.localeCompare(sortValueA) : sortValueA.localeCompare(sortValueB);
    });
    console.log("sorted arr" , arr);
    console.log(dataSpecialistDisplay)
    let sortedArr = [];
    arr.forEach(item => {
      sortedArr.push(item[1]);
    })
    setDataSpecialistDisplay(sortedArr);
  }, [sortColumn, sortDirect]);

  useEffect(() => {
    setCurrentID(""); // Reset the current ID when the page changes
  }, [currentPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const currentPageDataSpecialist = dataSpecialistDisplay.slice(startIndex,endIndex);
  return (
    <div>
      <DisplayMoreInfo show = {show} handleClose = {handleClose} dataMoreInfo = {dataSpecialistDisplay[currentID]} />
      <div className='outer-table'>
        <table>
          <thead>
            <tr>
              <th>ID </th>
              <th className='sort-col'  onClick={() => handleSort('lastMidleName')}>
                <span>Họ và tên đệm</span>
                <span className='sort-icon'>
                  <FontAwesomeIcon
                      icon={
                        sortColumn === 'lastMidleName'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    />
                </span>
              </th>
              <th className='sort-col'  onClick={() => handleSort('firstName')}>
                <span>Tên</span>
                <span className='sort-icon'>
                  <FontAwesomeIcon
                      icon={
                        sortColumn === 'firstName'
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
              <th className='sort-col' onClick={() => handleSort('age')}>
              <span>Tuổi</span>
              <span className='sort-icon'>
                <FontAwesomeIcon
                      icon={
                        sortColumn === 'age'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    />
              </span>
              </th>
              <th>Chẩn đoán</th>

              <th className='sort-col' onClick={() => handleSort('status')} >
                <span>Trạng thái</span>
                <span className='sort-icon'><FontAwesomeIcon icon={faSort} /></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageDataSpecialist.map((obj,index) => (
              <tr key={obj.citizenID} onClick={() => handleClickRow(
                currentPage > 1 ? index + rowsPerPage*(currentPage-1) : index
              )} >
                <td className='Specialist-id'>{obj.citizenID}</td>
                <td className='Specialist-name'>{obj.lastMidleName}</td>
                <td >{obj.firstName}</td>
                <td>{obj.gender}</td>
                <td>{obj.age}</td>
                <td>{obj.diagnosis}</td>
                <td className='status-block' >
                  <div className={`status ${getSpecialistStatusClass(obj.status)}`}>
                    {obj.status}
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