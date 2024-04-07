import React, { useState } from 'react';
import "./TableComponent.css";

const TableComponent = ({ jsonData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(Object.keys(jsonData).length / rowsPerPage);

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

  const displayInfoEquipment = (id) => {
    console.log(jsonData[id]);
  }

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  const currentIds = Object.keys(jsonData).slice(startIndex, endIndex);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            {/* <th>Lịch sử dùng</th>
            <th>Ngày bảo hành</th> */}
            
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {currentIds.map((id) => (
            <tr key={id} onClick={() => displayInfoEquipment(id)} >
              <td>{id}</td>
              <td>{jsonData[id].eqName}</td>
              {/* <td>{jsonData[id].usageHistory}</td>
              <td>{jsonData[id].regularMaintenance}</td> */}
              <td>{jsonData[id].Status}</td>
              
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