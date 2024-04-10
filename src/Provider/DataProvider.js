import React, { createContext, useState } from 'react'
const dataPatientContext = createContext();
const dataSpecialistContext = createContext();

const DataProvider = ({children}) => {
    const [dataPatient,setDataPatient] = useState([]);
    const [dataSpecialist, setDataSpecialist] = useState([]);
  return (
    <dataPatientContext.Provider value={{dataPatient,setDataPatient}} >
      <dataSpecialistContext.Provider value={{dataSpecialist,setDataSpecialist}}>
        {children}
      </dataSpecialistContext.Provider>
    </dataPatientContext.Provider>
  )
}

export {
    dataPatientContext,
    dataSpecialistContext,
    DataProvider
}
