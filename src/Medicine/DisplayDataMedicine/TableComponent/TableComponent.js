import React, {  useEffect, useState } from 'react';
import Detail from './Detail/Detail';
import { Button } from 'react-bootstrap';
import { faAnglesLeft, faAnglesRight,faSort, faSortUp, faSortDown, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import "./TableComponent.css";
import moment from 'moment';

const TableComponent = ({dataMedicineDisplay,setDataMedicineDisplay, role}) => {
  const rowsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(Object.keys(dataMedicineDisplay).length / rowsPerPage);
  const [currentID,setCurrentID] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirect, setSortDirect] = useState("desc");
  const [isDelete , setIsDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isSelectAll , setIsSelectAll ] = useState(false);
  const [isDisplayDetail, setIsDisplayDetail ] =useState(false);
  const [detailData , setDetailData ] = useState(null);
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getMedicineStatusClass = (status) => {
    switch (status) {
      case "Hết thuốc" : 
        return "treating";
      case "Sẵn sàng" :
        return "complete-treat";
      default :
        return "no-treat"
    }
  }

  const handleSort = (colName) => {
    if (colName === sortColumn) {
      setSortDirect(sortDirect === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(colName);
      setSortDirect('desc');
    }
  }

  const handleSelectAll = () =>{
    setSelectedRows( !isSelectAll ? dataMedicineDisplay.map(obj => obj.id) : [])
  }
 

  const handleDelete = async () =>{ 
    try{
      const response = await axios.put("http://localhost:8080/v1/medicines/deleteMany", selectedRows);
      console.log(selectedRows);       
      
    }
    catch(error){
      console.log(error);
    }
    window.location.reload();
  }



  useEffect(() => {
    if (!dataMedicineDisplay || !sortColumn) {
      return;
    }
    const arr = Object.entries(dataMedicineDisplay);
    arr.sort((a, b) => {
      let sortValueA = a[1][sortColumn];
      let sortValueB = b[1][sortColumn];
      if (sortColumn === "amount") {
        return sortDirect === "desc" ? sortValueB - sortValueA : sortValueA - sortValueB
      }
      if (sortColumn === "arrivalDatetime") {
        sortValueA = a[1]["arrivalDate"] + " " +a[1]["arrivalTime"];
        sortValueB = b[1]["arrivalDate"] + " " +b[1]["arrivalTime"];
        return sortDirect === "desc" ? moment(sortValueB,"DD-MM-YYYY HH:mm").diff( moment(sortValueA,"DD-MM-YYYY HH:mm")) : moment(sortValueA,"DD-MM-YYYY HH:mm").diff(moment(sortValueB,"DD-MM-YYYY HH:mm"));
      }
      if(sortColumn === "departureDatetime") {
        sortValueA = a[1]["departureDate"] + " " +a[1]["departureTime"];
        sortValueB = b[1]["departureDate"] + " " +b[1]["departureTime"];
        return sortDirect === "desc" ? moment(sortValueB,"DD-MM-YYYY HH:mm").diff( moment(sortValueA,"DD-MM-YYYY HH:mm")) : moment(sortValueA,"DD-MM-YYYY HH:mm").diff(moment(sortValueB,"DD-MM-YYYY HH:mm"));
      }
      if(sortColumn === "expireDate") {
        return sortDirect === "desc" ? moment(sortValueB,"DD-MM-YYYY").diff( moment(sortValueA,"DD-MM-YYYY")) : moment(sortValueA,"DD-MM-YYYY").diff(moment(sortValueB,"DD-MM-YYYY"));
      }
      return sortDirect === "desc" ? sortValueB.localeCompare(sortValueA) : sortValueA.localeCompare(sortValueB);
    });
    let sortedArr = [];
    arr.forEach(item => {
      sortedArr.push(item[1]);
    })
    setDataMedicineDisplay(sortedArr);
  }, [sortColumn, sortDirect]);

  useEffect(() => {
    setCurrentID(""); 
  }, [currentPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const currentPageDataMedicine = dataMedicineDisplay.slice(startIndex,endIndex);
  return (
    <div>
      {isDisplayDetail && <Detail detailData={detailData} setIsDisplayDetail={setIsDisplayDetail} />}
      <div className='delete-group'>
          {isDelete &&
          <span style={{marginRight:"1vw"}} > 
            <Button variant='danger' disabled={!selectedRows.length} onClick={handleDelete}> Xoá </Button>
          </span>}
      { (role === "admin") && <i className='delete-icon' onClick={() => {
          setSelectedRows([])
          setIsDelete(prevState => !prevState)
          setIsSelectAll(false);
        }}>
        <FontAwesomeIcon icon={isDelete ? faXmark : faTrashCan} />
      </i>}
      </div>

      <div className='outer-table'>
        <table>
          <thead>
            <tr>
             {isDelete &&
              <th > 
             <i style={{fontSize:"20px",marginRight:"10px"}} onClick={() => {
                handleSelectAll();
                setIsSelectAll(prevState => !prevState);
              }}>
             <FontAwesomeIcon icon={isSelectAll ? faSquareCheck: faSquare}/>
             </i> 
             <span>Xoá </span> </th>}
              <th className='sort-col'  onClick={() => handleSort('name')}>
              <span>Tên</span>
              <span className='sort-icon'>
                  <FontAwesomeIcon
                      icon={
                        sortColumn === 'name'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    />
                </span>
              </th>
              <th className='sort-col'  onClick={() => handleSort('arrivalDatetime')}>
                <span>Thời gian nhập</span>
                <span className='sort-icon'>
                  <FontAwesomeIcon
                      icon={
                        sortColumn === 'arrivalDatetime'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    />
                </span>
              </th>
              <th className='sort-col'   onClick={() => handleSort('departureDatetime')}>
                <span>Thời gian xuất</span>
                <span className='sort-icon'>                
                <FontAwesomeIcon
                      icon={
                        sortColumn === 'departureDatetime'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    /></span>
              </th>
              <th className='sort-col'   onClick={() => handleSort('expireDate')}>
                  <span>Hạn sử dụng</span>
                    <span className='sort-icon'>                
                    <FontAwesomeIcon
                          icon={
                            sortColumn === 'expireDate'
                              ? sortDirect === 'asc'
                                ? faSortUp
                                : faSortDown
                              : faSort
                          }
                    /></span>
              </th>
              <th className='sort-col'   onClick={() => handleSort('amount')}>
                  <span>Số lượng</span>
                    <span className='sort-icon'>                
                    <FontAwesomeIcon
                          icon={
                            sortColumn === 'amount'
                              ? sortDirect === 'asc'
                                ? faSortUp
                                : faSortDown
                              : faSort
                          }
                    /></span>
              </th>
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
            {currentPageDataMedicine.map((obj,index) => (
              <tr key={obj.id} style={{zIndex:"90"}} onClick={() => {
                setIsDelete(false);
                setIsDisplayDetail(true);
                setDetailData(obj);
              }}>
              {isDelete &&
               <td className='square-icon' style={{fontSize:"25px",zIndex:"100"}} onClick={(event) => {
                event.stopPropagation();
                const updatedRows = [...selectedRows];
                if (updatedRows.includes(obj.id)) {
                  updatedRows.splice(updatedRows.indexOf(obj.id), 1);
                } else {
                  updatedRows.push(obj.id);
                }
                setSelectedRows(updatedRows);
              }}>
              <FontAwesomeIcon  icon={selectedRows.includes(obj.id) ? faSquareCheck : faSquare} /> 
            </td>}
                <td style={{color:"black"}}>{obj.name}</td>
                <td >{obj.arrivalDate} {obj.arrivalTime}</td>
                <td>{obj.departureDate} {obj.departureTime}</td>
                <td>{obj.expireDate}</td>
                <td>{obj.amount}</td>
                <td className='status-block' >
                  <div className={`status ${getMedicineStatusClass(obj.status)}`}>
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