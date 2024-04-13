import React, { createContext, useState } from 'react'
const dataPatientContext = createContext();
const dataMedicalStaffContext = createContext();
const specialtyContext = createContext()
const DataProvider = ({children}) => {
    const [dataPatient,setDataPatient] = useState([]);
    const [dataMedicalStaff, setDataMedicalStaff] = useState([]);
    const [specialty, setSpecialty] = useState([  "Tim mạch","Sản","Não","Tiêu hoá","Hô Hấp","Tâm thần"])
  return (
    <dataPatientContext.Provider value={{dataPatient,setDataPatient}} >
      <dataMedicalStaffContext.Provider value={{dataMedicalStaff,setDataMedicalStaff}}>
        <specialtyContext.Provider value={{specialty,setSpecialty}} >
        {children}
        </specialtyContext.Provider>
      </dataMedicalStaffContext.Provider>
    </dataPatientContext.Provider>
  )
}

export {
    dataPatientContext,
    dataMedicalStaffContext,
    specialtyContext,
    DataProvider
}
