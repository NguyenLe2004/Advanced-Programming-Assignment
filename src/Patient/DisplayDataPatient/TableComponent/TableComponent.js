import React, {  useContext, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import DisplayDetailInfo from './DisplayDetailInfo/DisplayDetailInfo';
import "./TableComponent.css";
import { dataDisplayPatientContext } from '../../../DataControl/DataPatientProvider';
import CloseButton from 'react-bootstrap/CloseButton';
import { preventOperateContext } from '../../../PreventOperateProvider';

const TableComponent = () => {
  const {dataPatientDisplay} = useContext(dataDisplayPatientContext);
  const {isPreventOperate,setIsPreventOperate} = useContext(preventOperateContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDisplayDetail,setIsDisplayDetail] = useState(false);
  const [citizenID,setCitizenID] = useState("");
  const detaitRef = useRef(null);



  const rowsPerPage = 10;
  const totalPages = Math.ceil(Object.keys(dataPatientDisplay).length / rowsPerPage);
  const showPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPatientStatus = (treatProcess) => {
    const length = treatProcess.length;
    if (length === 0) {
        return "Chưa điều trị";
    }
    const currentDate = moment();
    const lastTreatDay = moment(treatProcess[length-1].dateEnd, 'DD/MM/YYYY');
    if (lastTreatDay < currentDate) {
        return "Hoàn thành điều trị";
    }
    return "Đang điều trị";
  }

  const closeDetailInfo = () => { 
    stopPreventUserOperation();
    setIsDisplayDetail(false);
  }

  const handleClickRow = () => {
    preventUserOperation();
    displayDetailInfo();
  }

  const displayDetailInfo = (id) => {
    const newCitizenID = id;
    setIsDisplayDetail(true);
    setCitizenID(newCitizenID);
    
  }

  const preventUserOperation = () => {
    setIsPreventOperate(true);
  }

  const stopPreventUserOperation = () => {
    setIsPreventOperate(false);
  }

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const currentIds = Object.keys(dataPatientDisplay).slice(startIndex, endIndex);
  return (
    <div>
      {isDisplayDetail && (
        <div ref={detaitRef}>
          <div className='close-btn'><CloseButton onClick={closeDetailInfo}/> </div>
          <DisplayDetailInfo citizenID = {citizenID} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ và Tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Chẩn đoán</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {currentIds.map((id) => (
            <tr key={id} onClick={() => handleClickRow(id)} >
              <td>{id}</td>
              <td className='patient-name'>{dataPatientDisplay[id].name}</td>
              <td>{dataPatientDisplay[id].gender}</td>
              <td>{dataPatientDisplay[id].dateOfBirth}</td>
              <td className='patient-medical-condition'>{dataPatientDisplay[id].medCondition}</td>
              <td>{getPatientStatus(dataPatientDisplay[id].treatProcess)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button onClick={goToPreviousPage}>&lt;</button>
        <span>{currentPage}</span>
        <button onClick={goToNextPage}>&gt;</button>
      </div>
    </div>
  );
};

export default TableComponent;