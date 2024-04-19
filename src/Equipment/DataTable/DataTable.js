import React from 'react'
import TableComponent from './TableComponent/TableComponent'
import axios from 'axios'
const DataTable = ({jsonData}) => {
  return (
    <div>
      <TableComponent jsonData={jsonData} />
    </div>
  )
}

export default DataTable;