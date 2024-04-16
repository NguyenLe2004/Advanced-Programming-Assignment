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
        "khoa nội",
        "khoa tai mũi họng",
        "khoa Da liễu",
        "khoa ngoại",
        "khoa răng hàm mặt",
        "khoa Xét nghiệm",
        "khoa sản",
        "khoa Y học cổ truyền"
      ],
      "Y tá": [
        "Hộ Sinh",
        "Điều dưỡng",
        "Gây mê hồi sức",
        "Hộ sinh"
      ],
      "Nhân viên hỗ trợ": [
        "Hộ Sinh",
        "Điều dưỡng",
        "Gây mê hồi sức",
        "Hộ sinh"
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
