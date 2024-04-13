import React, { useContext, useState } from 'react'
import { faPenToSquare, faXmark,faAnglesLeft,faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import moment from 'moment'
import "./EducateInfoBlock.css"
import { Row, Col, Button,Form } from 'react-bootstrap'
const EducateInfoBlock = ({medicalStaff}) => {
    const [isUpdate, setIsUpdate] = useState(false)
    const [validated, setValidated] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const educations = medicalStaff.education;
    if (!educations) return;
    const totalPage = educations.length;
    const handleDelete = () =>{
        let newEducates = [...educations];
        newEducates.splice(currentPage-1,1);
        const updateData = {
            education : newEducates
        }
        axios.patch("http://localhost:3000/MedicalStaff/"+ medicalStaff.id,updateData)
        .then(() => window.location.reload()) 
        .catch((error) => console.error(error))
    }
    const handleSubmit =  (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else{
        const updateData = {
            degree : form.elements.degree.value,
            specialty : form.elements.specialty.value,
            dateBegin : form.elements.dateBegin.value,
            dateEnd : form.elements.dateEnd.value,
            major : form.elements.major.value
        }
        axios.patch("http://localhost:3000/medicalStaff/" + medicalStaff.id,updateData)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            })
      } 
  
      setValidated(true);
    };
  return (
    <div>
        <div className='med-info-block' >
        <div className='pen-to-square-icon-med' ><FontAwesomeIcon icon={faPenToSquare} style={{position:"relative"}} onClick={() => setIsUpdate((prevState) => !prevState)} /></div>
        <h3 className='title-med-info'>Thông tin học vấn</h3>
        {!isUpdate ? (
            <div>
                {educations &&
                    <div style={{textAlign:"center"}}>
                    <Row className='mt-3 mb-3'>
                        <h4>{educations[currentPage-1].degree} {educations[currentPage-1].major}</h4>
                    </Row>
                    <Row className='mt-3 mb-3'>
                        <div>{educations[currentPage-1].university}</div>
                    </Row>
                    <Row className='mt-3 mb-3'>
                        <div style={{color:"gray"}}>Từ {educations[currentPage-1].dateBegin} đến {educations[currentPage-1].dateEnd}</div>
                    </Row>
                    <Button variant='outline-danger' onClick={handleDelete} style={{position:"absolute",right:"2vw",top:"10vh"}} ><FontAwesomeIcon icon={faXmark} /></Button>
                    </div>
                }
                <div style={{textAlign:"center"}}>
                    <span>
                        <Button style={{width:"5vw"}} disabled={currentPage<=1} onClick={() => setCurrentPage(currentPage-1)}>
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </Button>
                    </span>
                    <span style={{color:"gray",margin:"0 1vw"}}>
                        {currentPage} / {totalPage}
                    </span>
                    <span>
                        <Button style={{width:"5vw"}} disabled={currentPage>=totalPage} onClick={() => setCurrentPage(currentPage+1)} >
                        <FontAwesomeIcon icon={faAnglesRight} />
                        </Button>
                    </span>
                </div>
             </div>
        ):(
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
                <Row className="mb-3">
                    <Form.Group as={Col} md="5" controlId="degree">
                    <Form.Label>Loại bằng</Form.Label>
                    <Form.Select defaultValue={educations[currentPage-1].degree} required>
                        <option>{""}</option>
                        <option>Cử nhân</option>
                        <option>Thạc sĩ</option>
                        <option>Tiến sĩ</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="5" controlId="major">
                    <Form.Label>Ngành</Form.Label>
                    <Form.Control type='text' required defaultValue={educations[currentPage-1].major}  />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="university">
                    <Form.Label>Trường</Form.Label>
                    <Form.Control type="text" placeholder="Trường" defaultValue={educations[currentPage-1].university} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="dateBegin">
                    <Form.Label>Ngày bắt đầu</Form.Label>
                    <Form.Control type="date"  defaultValue={moment(educations[currentPage-1].dateBegin,"DD-MM-YYYY").format("YYYY-MM-DD")} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}  controlId="dateEnd">
                    <Form.Label>Ngày kết thúc</Form.Label>
                    <Form.Control type="date"  defaultValue={moment(educations[currentPage-1].dateEnd,"DD-MM-YYYY").format("YYYY-MM-DD")} required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit" style={{marginLeft:"50%",transform:"translateX(-50%)"}}>Cập nhập</Button>
                </Form>
        )}
    </div>
    </div>
  )
}

export default EducateInfoBlock

