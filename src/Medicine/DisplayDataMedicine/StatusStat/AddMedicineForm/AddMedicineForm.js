import React, { useState} from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import CloseButton from 'react-bootstrap/CloseButton';
import { Form,InputGroup,Button } from 'react-bootstrap';
import axios from 'axios'
import "./AddMedicineForm.css"
import moment from 'moment';
const AddMedicineForm = ({setShowAddMedicineForm}) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const [arrivalDate , arrivalTime] = form.elements.arrivalDatetime.value.split("T");
            const [departureDate , departureTime] = form.elements.departureDatetime.value.split("T");
            const data = {
                arrivalDate : moment(arrivalDate).format("DD-MM-YYYY"),
                arrivalTime : arrivalTime,
                departureDate : moment(departureDate).format("DD-MM-YYYY"),
                expireDate : moment(form.elements.expireDate.value).format("DD-MM-YYYY"),
                departureTime : departureTime,
                name : form.elements.name.value,
                amount : form.elements.amount.value
            }
            axios.post("http://localhost:8080/v1/medicines" , data)
            .then(()=> window.location.reload())
            .catch(error => console.error(error));
        }
        setValidated(true);
        };
        
    const handleClosebtn = () => {
        setShowAddMedicineForm(false);
    }
return (
    <div>
        <div className='center-page-medicine'>
            <CloseButton 
                style={{position:"absolute",right:"1vw",top:"1vh",fontSize:"20px",zIndex:"30"}}
                onClick={handleClosebtn}
            />
            <div className="outer-form-add-medicine"> 
                <Container>
                    <Form style={{padding:"2vh 1vw"}} noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3" ><h3>Thông tin thuốc</h3></Row>
                        <Row className="mb-3">
                        <Form.Group controlId="name">
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
                            <Form.Group as={Col} controlId="arrivalDatetime">
                                <Form.Label>Thời điểm nhập kho</Form.Label>
                                <Form.Control
                                required
                                type="datetime-local"
                                placeholder="Lịch sử bệnh án"
                                />

                            </Form.Group>
                            <Form.Group as={Col} controlId="departureDatetime">
                                <Form.Label>Thời điểm xuất kho</Form.Label>
                                <Form.Control
                                required
                                type="datetime-local"
                                placeholder="Lịch sử bệnh án"
                                />

                            </Form.Group>

                        </Row>
                        <Row className="mb-3" >
                            <Form.Group as={Col}  controlId="expireDate">
                                <Form.Label>Hạn sử dụng</Form.Label>
                                <Form.Control
                                required
                                type="date"
                                placeholder="Lịch sử bệnh án"
                                />

                            </Form.Group>
                            <Form.Group as={Col} controlId="amount">
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
                        <Button style={{left:'75%'}} type="submit" > Thêm Thuốc</Button>
                    </Form>
                </Container>
            </div>
        </div>

    </div>
  )
}

export default AddMedicineForm
