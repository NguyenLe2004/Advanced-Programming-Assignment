import React,{useState,useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./AddPatientInfoForm.css"
const AddPatientInfoForm = ({setIsSlide,setPersonalInfo}) => {
    const [validated, setValidated] = useState(false);
    
    const handleSubmit  = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.stopPropagation();
    } else {
        setPersonalInfo({
            lastMidleName: form.elements.lastMidleName.value,
            firstName: form.elements.firstName.value,
            gender: form.elements.gender.value,
            phoneNum: form.elements.phoneNum.value,
            email: form.elements.email.value,
            job: form.elements.job.value,
            citizenID: form.elements.citizenID.value,
            dateOfBirth: form.elements.dateOfBirth.value,
            address: form.elements.address.value,
            hometown: form.elements.hometown.value
        });
        setIsSlide(true)
    }
    setValidated(true);
    };
  return (
    <Form style={{padding:"2vh 1vw"}} noValidate validated={validated} onSubmit={handleSubmit}>
    <Row className="mb-3" ><h3>Thông tin cá nhân</h3></Row>
    <Row className="mb-3">
    <Form.Group as={Col} md="6" controlId="lastMidleName">
        <Form.Label>Họ và tên đệm</Form.Label>
        <Form.Control
        required
        type="text"
        placeholder="Họ và tên đệm"
        />
    </Form.Group>
    <Form.Group as={Col} md="5" controlId="firstName">
        <Form.Label>Tên</Form.Label>
        <Form.Control
        required
        type="text"
        placeholder="Tên"
        />
    </Form.Group>
    </Row>
    <Row className="mb-3">
    <Form.Group as={Col} md="3" controlId="gender">
        <Form.Label>Giới tính</Form.Label>
        <Form.Select required>
            <option>{""}</option>
            <option>Nam</option>
            <option>Nữ</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
        Please provide a valid city.
        </Form.Control.Feedback>
    </Form.Group>
    <Form.Group as={Col} md="4" controlId="dateOfBirth">
        <Form.Label>Ngày sinh</Form.Label>
        <Form.Control 
            type="date"
            required />
        <Form.Control.Feedback type="invalid">
        Please provide a valid state.
        </Form.Control.Feedback>
    </Form.Group>
    <Form.Group as={Col} md="5" controlId="citizenID">
        <Form.Label>CCCD</Form.Label>
        <Form.Control
        required
        pattern="^\d{12}"
        type="text"
        placeholder="CCCD"
        />
    </Form.Group>
    </Row>
    <Row className='mb-3' >
        <Form.Group as={Col} md="4" controlId = "phoneNum">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="tel" placeholder="Số điện thoại" required />
            <Form.Control.Feedback type="invalid">
            Please provide a valid city.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId = "email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" required />
            <Form.Control.Feedback type="invalid">
            Please provide a valid city.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId = "job">
            <Form.Label>Nghề nghiệp</Form.Label>
            <Form.Control type="text" placeholder="Nghề nghiệm" required />
            <Form.Control.Feedback type="invalid">
            Please provide a valid city.
            </Form.Control.Feedback>
        </Form.Group>
    </Row>
    <Row className='mb-3'>
        <Form.Group  controlId="address">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Địa chỉ"
            />

        </Form.Group>
    </Row>
    <Row className='mb-3'>
        <Form.Group  controlId="hometown">
            <Form.Label>Quê quán</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Quê quán"
            />

        </Form.Group>
    </Row>
    
    <Button type="submit" > Tiếp tục</Button>
    </Form>
  )
}

export default AddPatientInfoForm;
