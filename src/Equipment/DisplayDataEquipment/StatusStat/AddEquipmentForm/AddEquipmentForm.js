import React, { useRef, useState} from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import { Form,Button, } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios'
import "./AddEquipmentForm.css"
const AddEquipmentForm = ({setShowAddEquipmentForm}) => {


    const [validated, setValidated] = useState(false);
    const [maintain, setMaintain] = useState([])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const data= {
                name : form.elements.name.value,
                // regularMaintenance : [] 
            }
            try {
                const response = await axios.post('http://localhost:8080/v1/equipments',data);
                window.location.reload();
              } catch (error) {
                console.error(error);
              }
        }
        setValidated(true);
        };
    const handleClosebtn = () => {
        setShowAddEquipmentForm(false);
    }
return (
    <div>
        <div className='center-page'>
            <CloseButton 
                style={{position:"absolute",right:"1vw",top:"1vh",fontSize:"20px",zIndex:"30"}}
                onClick={handleClosebtn}
            />
            <div className={`outer-form-add-equipment `}> 
                <Container>
                    <Row>
                    <Form id="parent" style={{padding:"2vh 1vw"}} noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3" ><h3>Thông tin thiết bị</h3></Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} controlId="name">
                                <Form.Label>Tên thiết bị</Form.Label>
                                <Form.Control
                                required
                                type="text"
                                placeholder="Tên thiết bị"
                                />
                            <Form.Control.Feedback type="invalid">
                            Tên thiết bị không hợp lệ
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                            <Button type="submit" >Thêm Thiết bị</Button>
                        </Form>
                    </Row>
                </Container>
            </div>
        </div>

    </div>
  )
}

export default AddEquipmentForm
