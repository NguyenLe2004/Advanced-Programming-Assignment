import React, { useRef, useState} from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CloseButton from 'react-bootstrap/CloseButton';
import AddMedicalStaffInfoForm from './AddMedicalStaffInfoForm/AddMedicalStaffInfoForm';
import AddMedicalStaffEducateForm from './AddMedicalStaffEducateForm/AddMedicalStaffEducateForm';
import AddMedicalStaffCertForm from './AddMedicalStaffCertForm/AddMedicalStaffCertForm';
import "./AddMedicalStaffForm.css"
const AddMedicalStaffForm = ({setShowAddMedicalStaffForm}) => {
    const [isSlide1, setIsSlide1] = useState(false);
    const [isSlide2, setIsSlide2] = useState(false);
    const [personalInfo,setPersonalInfo] = useState({})
    const [education, setEducation] = useState([]);
    const handleClosebtn = () => {
        setIsSlide1(false);
        setShowAddMedicalStaffForm(false);
    }
return (
    <div className='center-page-medicalStaff'>
      <CloseButton
        style={{ position: "absolute", right: "1vw", top: "1vh", fontSize: "20px", padding: "0",zIndex:"22" }}
        onClick={handleClosebtn}
      />
      <div className={`outer-form-add-medcialStaff ${isSlide1 ? "slide_1" : ""} ${isSlide2 ? "slide_2" : ""}`}>
            <Row>
              <Col className='col-6' style={{width:"40vw" }}>
                <AddMedicalStaffInfoForm setIsSlide1={setIsSlide1} setPersonalInfo={setPersonalInfo} />
              </Col>
              <Col className='col-6' md="6" style={{width:"40vw" }}>
                <AddMedicalStaffEducateForm 
                    setIsSlide1={setIsSlide1} 
                    setIsSlide2={setIsSlide2} 
                    education={education} 
                    setEducation={setEducation} 
                    />
              </Col>
              <Col className='col-6' md="6" style={{ width:"40vw" }}>
                <AddMedicalStaffCertForm
                    setIsSlide2={setIsSlide2} 
                    personalInfo = {personalInfo}
                    education = {education}
                 />
              </Col>
            </Row>
      </div>
    </div>
  )
}

export default AddMedicalStaffForm
