import React, { createContext, useState } from 'react'
const dataPatientContext = createContext();
const dataMedicalStaffContext = createContext();
const specialtyContext = createContext()
const DataProvider = ({children}) => {
    const [dataPatient,setDataPatient] = useState([]);
    const [dataMedicalStaff, setDataMedicalStaff] = useState([]);
    const [allSpecialty, setAllSpecialty] = useState({
      "Bác sĩ": [
        "Tim mạch",
        "Nội",
        "Tai mũi họng",
        "Da liễu",
        "Ngoại",
        "Răng hàm mặt",
        "Xét nghiệm",
        "Sản",
        "Y học cổ truyền"
      ],
      "Y tá": [
        "Hộ sinh",
        "Điều dưỡng",
        "Gây mê hồi sức"
      ],
      "Nhân viên hỗ trợ": [
        "Hộ sinh",
        "Điều dưỡng",
        "Gây mê hồi sức"
      ]
    })
  return (
    <dataPatientContext.Provider value={{dataPatient,setDataPatient}} >
      <dataMedicalStaffContext.Provider value={{dataMedicalStaff,setDataMedicalStaff}}>
        <specialtyContext.Provider value={{allSpecialty,setAllSpecialty}} >
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
