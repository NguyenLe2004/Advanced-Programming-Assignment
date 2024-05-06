import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import axios  from 'axios';
import "./AddPatientMedInfoForm.css"
const AddPatientMedInfoForm = ({setIsSlide,personalInfo}) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const data= {
                ...personalInfo,
                height: form.elements.height.value,
                weight: form.elements.weight.value,
                bloodType : form.elements.bloodType.value,
                medHistory : form.elements.medHistory.value,
                symptoms : form.elements.symptoms.value,
                diagnosis : form.elements.diagnosis.value
            }
            console.log(data);
            try {
                const response = await axios.post('http://localhost:8080/v1/patients',data);
                console.log(response.data)
                window.open(`http://localhost:4000/Patient/${response.data.id}`, '_blank');
                window.location.reload();
              } catch (error) {
                console.error(error);
              }
        }
        setValidated(true);
    };
  return (
    <Form style={{padding:"2vh 1vw"}} noValidate validated={validated} onSubmit={handleSubmit}>
    <Row className="mb-3" ><h3>Thông tin y tế</h3></Row>
    <Row className="mb-3">
    <Form.Group as={Col} md="4" controlId="height">
    <Form.Label>Chiều cao</Form.Label>
    <InputGroup hasValidation>
        <Form.Control
        type="text"
        placeholder="Chiều cao"
        aria-describedby="inputGroupPrepend"
        required
        pattern="[0-9]{1,3}"
        />
        <InputGroup.Text id="inputGroupPrepend">cm</InputGroup.Text>
        <Form.Control.Feedback type="invalid">
        Chiều cao không hợp lệ
        </Form.Control.Feedback>
    </InputGroup>
    </Form.Group>
    <Form.Group as={Col} md="4" controlId="weight">
    <Form.Label>Cân nặng</Form.Label>
    <InputGroup hasValidation>
        <Form.Control
        type="text"
        placeholder="Cân nặng"
        aria-describedby="inputGroupPrepend"
        required
        pattern="[0-9]{1,3}"
        />
        <InputGroup.Text id="inputGroupPrepend">kg</InputGroup.Text>
        <Form.Control.Feedback type="invalid">
        Cân nặng không hợp lệ
        </Form.Control.Feedback>
    </InputGroup>
    </Form.Group>
    <Form.Group as={Col} md="4" controlId="bloodType">
        <Form.Label>Nhóm máu</Form.Label>
        <Form.Select required>
            <option>{""}</option>
            <option>A</option>
            <option>B</option>
            <option>AB</option>
            <option>O</option>
            <option>Chưa rõ </option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
        Nhóm máu không hợp lệ
        </Form.Control.Feedback>
    </Form.Group>
    </Row>
    <Row className='mb-3'>
        <Form.Group as={Col} controlId="medHistory">
            <Form.Label>Lịch sử bệnh án</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Lịch sử bệnh án"
            />
        <Form.Control.Feedback type="invalid">
        Lịch sử bệnh án không hợp lệ
        </Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col}  controlId="symptoms">
            <Form.Label>Triệu chứng bệnh</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Triệu chứng bệnh"
            />
        <Form.Control.Feedback type="invalid">
        Triệu chứng không hợp lệ
        </Form.Control.Feedback>
        </Form.Group>
    </Row>
    <Row className='mb-3'>
        <Form.Group  controlId="diagnosis">
            <Form.Label>Chẩn đoán</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Chẩn đoán"
            defaultValue={"Chưa được chẩn đoán"}
            />
        <Form.Control.Feedback type="invalid">
        Chẩn đoán không hợp lệ
        </Form.Control.Feedback>  
        </Form.Group>
 
    </Row>
    <Button onClick={() => setIsSlide(false)}> Quay lại</Button>
    <Button style={{position:"absolute",left:'75%',transform:"translateX(-50%)"}} type="submit" > Thêm bệnh nhân</Button>
    </Form>
  )
}

export default AddPatientMedInfoForm
