import React, { useRef, useState} from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import { Form,Button, } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios'
import "./AddEquipmentForm.css"
import AddEquipmentMaintainForm from './AddEquipmentMaintainForm/AddEquipmentMaintainForm';
const AddEquipmentForm = ({setShowAddEquipmentForm}) => {


    const [validated, setValidated] = useState(false);
    const [maintain, setMaintain] = useState([])
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
                    <Row className="mb-3" ><h3>Thông tin y tế</h3></Row>
                        <Row className='mb-3'>
                            <Form.Group as={Col} controlId="medHistory">
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
                        <Row>
                            <h5>Thông tin bảo dưỡng</h5>
                        </Row>
                        <Row className="mb-3">
                            {maintain.map((obj,index) => {
                                return (
                                    <div>{obj.description}</div>
                                )
                            })}
                        </Row>
                            <Button type="submit" > Thiết bị</Button>
                        </Form>
                        <AddEquipmentMaintainForm maintain={maintain} setMaintain = {setMaintain} />
                    </Row>
                </Container>
            </div>
        </div>

    </div>
  )
}

export default AddEquipmentForm
