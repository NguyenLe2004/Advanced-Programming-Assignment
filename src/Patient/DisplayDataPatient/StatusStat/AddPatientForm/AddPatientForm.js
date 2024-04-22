import React, { useRef, useState} from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import CloseButton from 'react-bootstrap/CloseButton';
import AddPatientInfoForm from './AddPatientInfoForm/AddPatientInfoForm';
import AddPatientMedInfoForm from './AddPatientMedInfoForm/AddPatientMedInfoForm';
import axios from 'axios'
import "./AddPatientForm.css"
const AddPatientForm = ({setShowAddPatientForm}) => {
    const [isSlide, setIsSlide] = useState(false);
    const slideRef = useRef(null);
    const [personalInfo,setPersonalInfo] = useState({})
    const handleClosebtn = () => {
        setIsSlide(false);
        setShowAddPatientForm(false);
    }
return (
    <div>
        <div className='center-page-patient'>
            <CloseButton 
                style={{position:"absolute",right:"1vw",top:"1vh",fontSize:"20px",zIndex:"30"}}
                onClick={handleClosebtn}
            />
            <div className={`outer-form-add ${isSlide? "slide":""} `} ref={slideRef}> 
                <Container>
                    <Row>
                        <Col>   
                            <AddPatientInfoForm setIsSlide={setIsSlide} setPersonalInfo={setPersonalInfo} />
                        </Col>

                        <Col>
                            <AddPatientMedInfoForm setIsSlide ={setIsSlide} personalInfo={personalInfo}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    </div>
  )
}

export default AddPatientForm
