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
    const [specialty, setSpecialty] = useState("");
    const [position, setPosition] = useState("");
    const [medStaffID, setMedStaffID] = useState(0);
    const [medStaffData, setMedStaffData] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log("med ",medStaffID)
            const data= {
                ...personalInfo,
                height: form.elements.height.value,
                weight: form.elements.weight.value,
                bloodType : form.elements.bloodType.value,
                medHistory : form.elements.medHistory.value,
                symtoms : form.elements.symtoms.value,
                diagnosis : form.elements.diagnosis.value,
                medicalStaffID : medStaffID,
                treatProcess : []
            }
            try {
                const response = await axios.post('http://localhost:3000/Patient',data);
                window.open(`http://localhost:4000/Patient/${response.data.id}`, '_blank');
              } catch (error) {
                console.error(error);
              }
        }
        setValidated(true);
        };
    const handleDisplayMedStaff = () => {
        let queryStr="";
        if (specialty!=="") queryStr ="specialty="+specialty;
        if (position!=="") queryStr += queryStr? "&position="+position :"position="+position;
        const getMedStaff = async () => {
            try {
              const response = await axios.get("http://localhost:3000/MedicalStaff?" + queryStr ) ;
              setMedStaffData(response.data);
            } catch (error) {
              console.log(error); 
            }
          };
        getMedStaff();
    }
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
        />
        <InputGroup.Text id="inputGroupPrepend">cm</InputGroup.Text>
        <Form.Control.Feedback type="invalid">
        Please choose a username.
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
        />
        <InputGroup.Text id="inputGroupPrepend">kg</InputGroup.Text>
        <Form.Control.Feedback type="invalid">
        Please choose a username.
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
        Please provide a valid city.
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

        </Form.Group>
        <Form.Group as={Col}  controlId="symtoms">
            <Form.Label>Triệu chứng bệnh</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Triệu chứng bệnh"
            />
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
        </Form.Group>
    </Row>
    <Row className='mb-3'>
        <h5>Phân công nhân viên y tế</h5>
        <Form>
            <Row className='mb-3'>
                <Form.Group as={Col} md="3">
                    <Form.Label>Chuyên khoa</Form.Label>
                    <Form.Select onChange={(event) => setSpecialty(event.target.value)} >
                        <option>{""}</option>
                        <option>Tim mạch</option>
                        <option>Sản</option>
                        <option>Não</option>
                        <option>Tiêu hoá</option>
                        <option>Hô Hấp</option>
                        <option>Tâm thần</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Vị trí</Form.Label>
                    <Form.Select onChange={(event)=>setPosition(event.target.value)} >
                        <option>{""}</option>
                        <option>Y tá</option>
                        <option>Bác sĩ</option>
                        <option>Nhân viên hỗ trợ</option>

                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="diagnosis" required>
                    <Form.Label>Chọn nhân viên</Form.Label>
                    <Form.Select required onClick={handleDisplayMedStaff} onChange={(event) => setMedStaffID(event.target.value)}>
                        <option>{""}</option>
                        {medStaffData&&
                         medStaffData.map((obj,index) => {
                            return <option key={index} value={obj.id} > {obj.name} </option>
                        })}
                    </Form.Select>
                </Form.Group>
            </Row>
        </Form>

    </Row>
    <Button onClick={() => setIsSlide(false)}> Quay lại</Button>
    <Button style={{position:"absolute",left:'75%',transform:"translateX(-50%)"}} type="submit" > Thêm bệnh nhân</Button>
    </Form>
  )
}

export default AddPatientMedInfoForm
