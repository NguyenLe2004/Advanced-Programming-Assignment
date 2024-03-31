import React, {createContext, useState} from 'react'
const dataPatientContext = createContext();
const dataDisplayPatientContext = createContext()
const DataPatientProvider = ({children}) => {
    const [dataPatient, setDataPatient] = useState({});
    const [dataPatientDisplay,setDataPatientDisplay] = useState({});
  return (
    <dataPatientContext.Provider value={{dataPatient, setDataPatient}}>
      <dataDisplayPatientContext.Provider value = {{dataPatientDisplay,setDataPatientDisplay}}>
        {children}
      </dataDisplayPatientContext.Provider>
    </dataPatientContext.Provider>
  )
}

export {dataPatientContext, DataPatientProvider,dataDisplayPatientContext };