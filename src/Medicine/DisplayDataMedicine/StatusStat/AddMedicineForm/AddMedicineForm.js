import React, { useState} from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import CloseButton from 'react-bootstrap/CloseButton';
import { Form,InputGroup,Button } from 'react-bootstrap';
import axios from 'axios'
import "./AddMedicineForm.css"
const AddMedicineForm = ({setShowAddMedicineForm}) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // const data= {
            //     ...personalInfo,
            //     height: form.elements.height.value,
            //     weight: form.elements.weight.value,
            //     bloodType : form.elements.bloodType.value,
            //     medHistory : form.elements.medHistory.value,
            //     symtoms : form.elements.symtoms.value,
            //     diagnosis : form.elements.diagnosis.value,
            //     treatProcess : []
            // }
            // try {
            //     const response = await axios.post('http://localhost:3000/Patient',data);
            //     window.open(`http://localhost:4000/Patient/${response.data.id}`, '_blank');
            //   } catch (error) {
            //     console.error(error);
            //   }
        }
        setValidated(true);
        };
        
    const handleClosebtn = () => {
        setShowAddMedicineForm(false);
    }
return (
    <div>
        <div className='center-page-medicine'>
        {}
            <CloseButton 
                style={{position:"absolute",right:"1vw",top:"1vh",fontSize:"20px",zIndex:"30"}}
                onClick={handleClosebtn}
            />
            <div className="outer-form-add-medicine"> 
                <Container>
                    <Form style={{padding:"2vh 1vw"}} noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3" ><h3>Thông tin thuốc</h3></Row>
                        <Row className="mb-3">
                        <Form.Group controlId="height">
                        <Form.Label>Tên thuốc</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Tên thuốc"
                            aria-describedby="inputGroupPrepend"
                            required
                            />
                            <Form.Control.Feedback type="invalid">
                            Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} controlId="medHistory">
                                <Form.Label>Thời điểm nhập kho</Form.Label>
                                <Form.Control
                                required
                                type="datetime-local"
                                placeholder="Lịch sử bệnh án"
                                />

                            </Form.Group>
                            <Form.Group as={Col} controlId="medHistory">
                                <Form.Label>Thời điểm xuất kho</Form.Label>
                                <Form.Control
                                required
                                type="datetime-local"
                                placeholder="Lịch sử bệnh án"
                                />

                            </Form.Group>

                        </Row>
                        <Row className="mb-3" >
                            <Form.Group as={Col}  controlId="medHistory">
                                <Form.Label>Hạn sử dụng</Form.Label>
                                <Form.Control
                                required
                                type="date"
                                placeholder="Lịch sử bệnh án"
                                />

                            </Form.Group>
                            <Form.Group as={Col} controlId="bloodType">
                                <Form.Label> Số lượng</Form.Label>
                                <Form.Control 
                                type='number'
                                placeholder="Nhập số lượng"
                                required />
                                <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button style={{left:'75%'}} type="submit" > Thêm bệnh nhân</Button>
                    </Form>
                </Container>
            </div>
        </div>

    </div>
  )
}

export default AddMedicineForm
