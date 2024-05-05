import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import moment from 'moment'
import axios from 'axios';

const UpdateEquipmentForm = ({equipmentData,setIsUpdate}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else{
      const updateDate = {
        name : form.elements.name.value,
      }
      axios.put("http://localhost:8080/v1/equipment/"+equipmentData.id,updateDate)
        .then(() => window.location.reload())
        .catch(error=>console.error(error))
    }
    setValidated(true);
  };
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group controlId="name">
            <Form.Label>Tên thiết bị</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Tên thiết bị"
              defaultValue={equipmentData.name}
            />
            <Form.Control.Feedback type="invalid">
              Tên thiết bị không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Đổi thông tin thiết bị</Button>
        <Button variant='danger' onClick={() => setIsUpdate(false)} style={{marginLeft:"5vw"}}>Huỷ</Button>
      </Form>
    </div>
  )
}

export default UpdateEquipmentForm;