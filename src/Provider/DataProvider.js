import React, { createContext, useState } from 'react'
const dataPatientContext = createContext();

const DataProvider = ({children}) => {
    const [dataPatient,setDataPatient] = useState([]);
  return (
    <dataPatientContext.Provider value={{dataPatient,setDataPatient}} >
        {children}
    </dataPatientContext.Provider>
  )
}

export {
    dataPatientContext,
    DataProvider
}
