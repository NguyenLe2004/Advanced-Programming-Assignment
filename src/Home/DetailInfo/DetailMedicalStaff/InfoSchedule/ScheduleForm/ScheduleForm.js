import React from 'react'
import "./ScheduleForm.css"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
const ScheduleForm = ({medicalStaff}) => {

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else{
      const newSchedule = [
        ...medicalStaff.schedule,
        {
          date: form.elements.date.value.split("-")[2]+"-" + form.elements.date.value.split("-")[1]+"-" + form.elements.date.value.split("-")[0],
          timeBegin:form.elements.timeBegin.value,
          timeEnd:form.elements.timeEnd.value,
          room:form.elements.room.value,
          title:form.elements.title.value,
          description: form.elements.description.value,
        }
      ]
        axios.patch("http://localhost:3000/medicalStaff/" + medicalStaff.id, {schedule : newSchedule} )
        .then(()=> {
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    // 
    }
    setValidated(true);

  }
  return (
    <div className='form-block'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} xs="4" controlId="date">
              <Form.Label>Ngày</Form.Label>
              <Form.Control
                required
                type="date"
              />
            </Form.Group> 
            <Form.Group as={Col} md="4" controlId="timeBegin">
              <Form.Label>Giờ bắt đầu</Form.Label>
              <Form.Control 
                required 
                type="time"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="timeEnd">
              <Form.Label>Giờ kết thúc</Form.Label>
              <Form.Control 
                required 
                type="time"
              />
            </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="8" controlId="title">
              <Form.Label>Công việc</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Công việc"
                  aria-describedby="inputGroupPrepend"
                  required
                />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="room">
              <Form.Label>Phòng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phòng"
                  aria-describedby="inputGroupPrepend"
                  required
                />
            </Form.Group>
            </Row>
          <Row className="mb-3">
            <Form.Group controlId="description">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Mô tả" 
                required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
          </Row>
          <Button type="submit">Thêm lịch</Button>
        </Form>
    </div>
  )
}

export default ScheduleForm
