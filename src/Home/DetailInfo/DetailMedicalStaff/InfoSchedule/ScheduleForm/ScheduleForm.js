import React from "react";
import "./ScheduleForm.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import moment from "moment";
import axios from "axios";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
const ScheduleForm = ({ medicalStaff }) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const {id} = useParams();
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
 else {
  const Begin = moment(form.elements.datetimeBegin.value);
  const End = moment(form.elements.datetimeEnd.value);
  const curDay = moment();
  if (curDay.isAfter(Begin)) {
    setError("thời điểm bắt đầu và kết thúc không hợp lệ");
    return;
  } else if (Begin.isAfter(End)) {
    setError("thời điểm bắt đầu và kết thúc không hợp lệ");
    return;
  }
      const [dateBegin, timeBegin] =
        form.elements.datetimeBegin.value.split("T");
      const [dateEnd, timeEnd] = form.elements.datetimeEnd.value.split("T");
      const newSchedule = 
       {
          dateBegin: moment(dateBegin).format("DD-MM-YYYY"),
          timeBegin: timeBegin,
          dateEnd: moment(dateEnd).format("DD-MM-YYYY"),
          timeEnd: timeEnd,
          room: form.elements.room.value,
          title: form.elements.title.value,
          description: form.elements.description.value,
        }
        console.log(newSchedule)
      axios
        .post(`http://localhost:8080/v1/specialists/${id}/schedules/`,newSchedule)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
      //
    }
    setValidated(true);
  };
  return (
    <div className="form-block">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          {error && (
            <div>
              <style>
                {`
        .alert-danger {
        font-size: 15px; /* Điều chỉnh kích thước phù hợp */
        padding: 5px 10px;
          }
        `}
              </style>
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
          <Form.Group as={Col} md="5" controlId="datetimeBegin">
            <Form.Label>Thời điểm bắt đầu</Form.Label>
            <Form.Control required type="datetime-local" />
            <Form.Control.Feedback type="invalid">
              Thông tin không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="datetimeEnd">
            <Form.Label>Thời điểm kết thúc</Form.Label>
            <Form.Control required type="datetime-local" />
            <Form.Control.Feedback type="invalid">
              Thông tin không hợp lệ
            </Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">
              Công việc không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="room">
            <Form.Label>Phòng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phòng"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Thông tin không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="description">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control type="text" placeholder="Mô tả" required />
            <Form.Control.Feedback type="invalid">
              Thông tin không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Thêm lịch</Button>
      </Form>
    </div>
  );
};

export default ScheduleForm;
