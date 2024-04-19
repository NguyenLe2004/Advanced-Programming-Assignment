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

  const displayInfoSuportStaff = (id) => {
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
            <th>Giới tính</th>
            <th>Ngày/tháng/năm sinh</th>
            <th>Email</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {currentIds.map((id) => (
            <tr key={id} onClick={() => displayInfoSuportStaff(id)} >
              <td>{id}</td>
              <td>{jsonData[id].name}</td>
              <td>{jsonData[id].gender}</td>
              <td>{jsonData[id].dateOfBirth}</td>
              <td>{jsonData[id].email}</td>
              <td>{jsonData[id].phoneNum}</td>
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