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

  const displayInfoMedicine = (id) => {
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
            <th>Ngày nhập kho</th>
            <th>Ngày xuất kho</th>
            <th>Hạn sử dụng</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {currentIds.map((id) => (
            <tr key={id} onClick={() => displayInfoMedicine(id)} >
              <td>{id}</td>
              <td>{jsonData[id].medName}</td>
              <td>{jsonData[id].arriveTime}</td>
              <td>{jsonData[id].departureTime}</td>
              <td>{jsonData[id].expireDate}</td>
              <td>{jsonData[id].amount}</td>
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