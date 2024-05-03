import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import moment from 'moment'
import axios from 'axios';

const UpdateMedicineForm = ({medicineData,setIsUpdate}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else{
      const [arrivalDate, arrivalTime ] = form.elements.arrivalDatetime.value.split("T");
      const [departureDate, departureTime ] = form.elements.departureDatetime.value.split("T");
      const updateDate = {
        name : form.elements.name.value,
        expireDate : moment(form.elements.expireDate.value).format("DD-MM-YYYY"),
        amount :form.elements.amount.value,
        arrivalDate :moment(arrivalDate).format("DD-MM-YYYY"),
        arrivalTime : moment(arrivalTime,"HH:mm").format("HH:mm"),
        departureDate :moment(departureDate).format("DD-MM-YYYY"),
        departureTime : moment(departureTime,"HH:mm").format("HH:mm")
      }
      axios.put("http://localhost:8080/v1/medicines/"+medicineData.id,updateDate)
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
            <Form.Label>Tên thuốc</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Tên thuốc"
              defaultValue={medicineData.name}
              pattern="^[a-zA-Z0-9]+$"
            />
              <Form.Control.Feedback type="invalid">
             Tên không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="7" controlId="arrivalDatetime">
            <Form.Label>Thời điểm nhập kho</Form.Label>
            <Form.Control type="datetime-local" required defaultValue={
              moment(medicineData.arrivalDate,"DD-MM-YYYY").format("YYYY-MM-DD")+ "T" + medicineData.arrivalTime
            } />
            <Form.Control.Feedback type="invalid">
              Thời điểm không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="expireDate" >
            <Form.Label>Ngày hết hạn</Form.Label>
            <Form.Control type="date"  required defaultValue={moment(medicineData.arrivalDate,"DD-MM-YYYY").format("YYYY-MM-DD")} />
            <Form.Control.Feedback type="invalid">
              Thời điểm không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="7" controlId="departureDatetime">
            <Form.Label>Thời điểm xuất kho</Form.Label>
            <Form.Control type="datetime-local"  required defaultValue={moment(medicineData.departureDate,"DD-MM-YYYY").format("YYYY-MM-DD")+ "T" + medicineData.departureTime} />
            <Form.Control.Feedback type="invalid">
              Thời điểm không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="amount">
            <Form.Label>Số lượng</Form.Label>
            <Form.Control type="number" placeholder="Số lượng" min ='0' required defaultValue={medicineData.amount} />
            <Form.Control.Feedback type="invalid">
              Số lượng không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Đổi thông tin thuốc</Button>
        <Button variant='danger' onClick={() => setIsUpdate(false)} style={{marginLeft:"5vw"}}>Huỷ</Button>
      </Form>
    </div>
  )
}

export default UpdateMedicineForm;