import React, {  useEffect, useState } from 'react';
import DisplayMoreInfo from './DisplayMoreInfo/DisplayMoreInfo';
import { Button } from 'react-bootstrap';
import { faAnglesLeft, faAnglesRight,faSort, faSortUp, faSortDown,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./TableComponent.css";
import moment from 'moment';

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
      case "Đang sử dụng" : 
        return "treating";
      case "Sẵn sàng" :
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
      let sortValueA = a[1][sortColumn];
      let sortValueB =  b[1][sortColumn];
      const notAvailable = "01-01-1900"
      if (sortColumn === "lastUsageDatetime") {
        return sortDirect === "desc" ? moment(sortValueB,"DD-MM-YYYY HH:mm").diff(moment(sortValueA,"DD-MM-YYYY HH:mm")) 
        : moment(sortValueA,"DD-MM-YYYY HH:mm").diff(moment(sortValueB,"DD-MM-YYYY HH:mm"));
      }
      if(sortColumn === "nextMaintain") {
        if(sortValueA ==="Chưa có lịch bảo trì") sortValueA = notAvailable
        if(sortValueB ==="Chưa có lịch bảo trì") sortValueB = notAvailable
        return sortDirect === "desc" ? moment(sortValueB,"DD-MM-YYYY").diff(moment(sortValueA,"DD-MM-YYYY")) 
        :  moment(sortValueA,"DD-MM-YYYY").diff(moment(sortValueB,"DD-MM-YYYY")) ;
      }
      return sortDirect === "desc" ? sortValueB.localeCompare(sortValueA) : sortValueA.localeCompare(sortValueB);
    });
    let sortedArr = [];
    arr.forEach(item => {
      sortedArr.push(item[1]);
    })
    setDataEquipmentDisplay(sortedArr);
  }, [sortColumn, sortDirect]);

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
              <th className='sort-col'  onClick={() => handleSort('lastUsageDatetime')}>
                <span>Lần sử dụng cuối</span>
                <span className='sort-icon'>
                  <FontAwesomeIcon
                      icon={
                        sortColumn === 'lastUsageDatetime'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    />
                </span>
              </th>
              <th className='sort-col'   onClick={() => handleSort('lastUsageRoom')}>
                <span>Phòng sử dụng cuối</span>
                <span className='sort-icon'>                
                <FontAwesomeIcon
                      icon={
                        sortColumn === 'lastUsageRoom'
                          ? sortDirect === 'asc'
                            ? faSortUp
                            : faSortDown
                          : faSort
                      }
                    /></span>
              </th>
              <th className='sort-col'   onClick={() => handleSort('nextMaintain')}>
                <span>Lịch bảo trì tiếp theo</span>
                <span className='sort-icon'>                
                <FontAwesomeIcon
                      icon={
                        sortColumn === 'nextMaintain'
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
            {currentPageDataEquipment.map((obj,index) => (
              <tr key={obj.citizenID} onClick={() => handleClickRow(
                currentPage > 1 ? index + rowsPerPage*(currentPage-1) : index
              )} >
                <td style={{color:"black"}}>{obj.name}</td>
                <td >{obj.lastUsageDatetime}</td>
                <td>{obj.lastUsageRoom}</td>
                <td>{obj.nextMaintain}</td>
                <td className='status-block' >
                  <div className={`status ${getEquipmentStatusClass(obj.status)}`}>
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