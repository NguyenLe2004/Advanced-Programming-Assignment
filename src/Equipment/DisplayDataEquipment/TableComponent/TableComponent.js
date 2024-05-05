import React, {  useEffect, useState } from 'react';
import DisplayMoreInfo from './DisplayMoreInfo/DisplayMoreInfo';
import Detail from './Detail/Detail';
import { Button } from 'react-bootstrap';
import { faAnglesLeft, faAnglesRight,faSort, faSortUp, faSortDown, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import "./TableComponent.css";
import moment from 'moment';

const TableComponent = ({dataEquipmentDisplay,setDataEquipmentDisplay, role}) => {
  const rowsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(Object.keys(dataEquipmentDisplay).length / rowsPerPage);
  const [currentID,setCurrentID] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirect, setSortDirect] = useState("desc");
  const [isDisplayDetail, setIsDisplayDetail ] =useState(false);
  const [detailData , setDetailData ] = useState(null);
  const [show, setShow] = useState(false);
  const [isDelete , setIsDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isSelectAll , setIsSelectAll ] = useState(false);
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
  const handleSelectAll = () =>{
    setSelectedRows( !isSelectAll ? dataEquipmentDisplay.map(obj => obj.id) : [])
  }

  const handleDelete = async () =>{ 
    try{
      const response = await axios.put("http://localhost:8080/v1/equipments/deleteMany", selectedRows);
      console.log(selectedRows);       
      
    }
    catch(error){
      console.log(error);
    }
    window.location.reload();
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
  useEffect(() => {
    setCurrentID(""); 
  }, [currentPage]);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const currentPageDataEquipment = dataEquipmentDisplay.slice(startIndex,endIndex);
  return (
    <div>
      {isDisplayDetail && <Detail detailData={detailData} setIsDisplayDetail={setIsDisplayDetail} />}

      <div className='delete-group'>
          {isDelete &&
          <span style={{marginRight:"1vw"}} > 
            <Button variant='danger' disabled={!selectedRows.length} onClick={handleDelete}> Xoá </Button>
          </span>}
        { (role === "admin") &&  <i className='delete-icon' onClick={() => {
          setSelectedRows([])
          setIsDelete(prevState => !prevState)
          setIsSelectAll(false);
        }}><FontAwesomeIcon icon={isDelete ? faXmark : faTrashCan} /></i> }
      </div>

      <DisplayMoreInfo show = {show} handleClose = {handleClose} dataMoreInfo = {dataEquipmentDisplay[currentID]} />
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
              <tr key={obj.id} style={{zIndex:"90"}} onClick={() => {
                setIsDelete(false)
                setIsDisplayDetail(true);
                setDetailData(obj);
              }}>
                {isDelete &&
               <td className='square-icon' style={{fontSize:"25px",zIndex:"30"}} onClick={(event) => {
                event.stopPropagation();
                const updatedRows = [...selectedRows];
                if (updatedRows.includes(obj.id)) {
                  updatedRows.splice(updatedRows.indexOf(obj.id), 1);
                } else {
                  updatedRows.push(obj.id);
                }
                setSelectedRows(updatedRows);
              }}>
            <FontAwesomeIcon  icon={selectedRows.includes(obj.id) ? faSquareCheck : faSquare} /> </td>}
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