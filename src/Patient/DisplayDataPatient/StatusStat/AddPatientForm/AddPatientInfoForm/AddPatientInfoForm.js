import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import moment from "moment";
import { Alert } from "react-bootstrap";
import "./AddPatientInfoForm.css";
const AddPatientInfoForm = ({ setIsSlide, setPersonalInfo }) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [dateOfBirth,setDateOfBirth]  = useState("")
  const handleSubmit =  (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if(moment(dateOfBirth).isAfter(moment())) {
        setError("jsdbfjkasfjknsdjk"); 
        return;
      }
      setPersonalInfo({
        lastMiddleName: form.elements.lastMiddleName.value,
        firstName: form.elements.firstName.value,
        gender: form.elements.gender.value,
        phoneNum: form.elements.phoneNum.value,
        email: form.elements.email.value,
        job: form.elements.job.value,
        citizenID: form.elements.citizenID.value,
        dateOfBirth: form.elements.dateOfBirth.value,
        address: form.elements.address.value,
        hometown: form.elements.hometown.value,
      });
      setError("")
      setIsSlide(true);
    }
    setValidated(true);
  };
  return (
    <Form
      style={{ padding: "2vh 1vw" }}
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Row className="mb-3">
        <h3>Thông tin cá nhân</h3>
        {error && 
        <div >{error}</div>}
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="lastMiddleName">
          <Form.Label>Họ và tên đệm</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Họ và tên đệm"
            pattern="[a-zA-ZÀ-Ỹà-ỹ\s']+"
          />
          <Form.Control.Feedback type="invalid">
            Họ và tên đệm không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="firstName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tên"
            pattern="[a-zA-ZÀ-Ỹà-ỹ']+"         
          />
          <Form.Control.Feedback type="invalid">
            Tên không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="gender">
          <Form.Label>Giới tính</Form.Label>
          <Form.Select required>
            <option>{""}</option>
            <option>Nam</option>
            <option>Nữ</option>
          </Form.Select>          
          <Form.Control.Feedback type="invalid">
            Giới tính không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="dateOfBirth">
          <Form.Label>Ngày sinh</Form.Label>
          <Form.Control type="date" required onChange={(event) => setDateOfBirth(event.target.value)} /> 
          <Form.Control.Feedback type="invalid">
            Ngày sinh không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="citizenID">
          <Form.Label>CCCD</Form.Label>
          <Form.Control
            required
            pattern="^\d{12}"
            type="text"
            placeholder="CCCD"
          />
          <Form.Control.Feedback type="invalid">
            CCCD không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="phoneNum">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Số điện thoại"
            required
            pattern="^\d{10}"
          />
          <Form.Control.Feedback type="invalid">
            Số điện thoại không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            // pattern="/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i"
            pattern=".+@.+\.[A-Za-z]+$"
          />
          <Form.Control.Feedback type="invalid">
            Email không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="job">
          <Form.Label>Nghề nghiệp</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nghề nghiệp"
            required
            pattern="[a-zA-ZÀ-Ỹà-ỹ\s']+"
          />
          <Form.Control.Feedback type="invalid">
            Nghề nghiệp không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="address">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control required type="text" placeholder="Địa chỉ" />
          <Form.Control.Feedback type="invalid">
            Địa chỉ không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="hometown">
          <Form.Label>Quê quán</Form.Label>
          <Form.Control required type="text" placeholder="Quê quán" />
          <Form.Control.Feedback type="invalid">
            Quê quán không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button type="submit"> Tiếp tục</Button>
    </Form>
  );
};

export default AddPatientInfoForm;
