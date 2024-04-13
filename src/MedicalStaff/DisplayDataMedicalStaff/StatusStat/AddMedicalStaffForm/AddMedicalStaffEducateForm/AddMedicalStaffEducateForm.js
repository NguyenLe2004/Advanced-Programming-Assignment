import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./AddMedicalStaffEducateForm.css"
const AddMedicalStaffEducateForm = ({setIsSlide1,setIsSlide2,education, setEducation}) => {
    const [validated, setValidated] = useState(false);

    const handleDeleteEducation = (index) => {
      setEducation((prevEducation) =>
        prevEducation.filter((_, i) => i !== index)
      );
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
          setValidated(true);
        }else {
          setEducation([
            ...education,
            {
              dateBegin : form.elements.dateBegin.value,
              dateEnd : form.elements.dateEnd.value,
              university : form.elements.university.value,
              degree : form.elements.degree.value,
              major : form.elements.major.value
            }
          ])
          form.reset();
          setValidated(false);
        }
        };
  return (
          <Form style={{padding:"2vh 1vw"}} noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3" ><h3>Học vấn</h3></Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="8" controlId="university" >
              <Form.Label>Trường</Form.Label>
              <Form.Control
                type='text'
                placeholder="Trường"
                required
               />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="degree" >
              <Form.Label>Loại bằng</Form.Label>
              <Form.Select  required >
                <option>{""}</option>
                <option >Bác sĩ</option>
                <option>Thạc sĩ</option>
                <option>Tiến sĩ</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="dateBegin">
                <Form.Label>Ngày bắt đầu</Form.Label>
                <Form.Control type="date" required />
                <Form.Control.Feedback type="invalid">
                Please provide a valid city.
                </Form.Control.Feedback>
            </Form.Group>
              <Form.Group as={Col} md="4" controlId="dateEnd">
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control type="date" required />
                <Form.Control.Feedback type="invalid" required>
                Please provide a valid city.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="major">
                <Form.Label>Ngành</Form.Label>
                <Form.Control type="text" placeholder="Ngành"  required/>
                <Form.Control.Feedback type="invalid">
                Please provide a valid city.
                </Form.Control.Feedback>
            </Form.Group>
            <Row className="mt-3 mb-3">
              {education.map((obj , index)=>{
                return (
                  <div>
                  <span style={{fontSize:"15px",color:"rgb(0,0,0,0.5)",fontWeight:"bold"}}>
                    {obj.dateBegin.split("-").join("/")} - {obj.dateEnd.split("-").join("/")} {obj.university} : {obj.degree} {obj.major}
                  </span>
                  <span className='icon-xmark-educate'  onClick={() => handleDeleteEducation(index) }>
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                  </div>
                )
              })}
            </Row>
          </Row>
    <Button onClick={() => {
      setIsSlide1(false);
    }}> Quay lại</Button>
    <Button type='submit' > Thêm học vấn </Button>
    <Button disabled={!education.length} onClick={() => {
        setIsSlide2(true);
    }}>
      Tiếp tục 
    </Button>

    </Form>
  )
}

export default AddMedicalStaffEducateForm;