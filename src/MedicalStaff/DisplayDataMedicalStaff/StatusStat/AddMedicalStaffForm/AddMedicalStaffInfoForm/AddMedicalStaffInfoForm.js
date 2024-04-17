import React, { useState, useContext } from "react";
import { specialtyContext } from "../../../../../Provider/DataProvider";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
// import "./AddMedicalStaffInfoForm.css"
const AddMedicalStaffInfoForm = ({ setIsSlide1, setPersonalInfo }) => {
  const {position } = useParams();
  const [validated, setValidated] = useState(false);
  const { allSpecialty } = useContext(specialtyContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setPersonalInfo({
        lastMiddleName: form.elements.lastMiddleName.value,
        specialty: form.elements.specialty.value,
        firstName: form.elements.firstName.value,
        gender: form.elements.gender.value,
        phoneNum: form.elements.phoneNum.value,
        email: form.elements.email.value,
        citizenID: form.elements.citizenID.value,
        dateOfBirth: form.elements.dateOfBirth.value,
        address: form.elements.address.value,
        hometown: form.elements.hometown.value,
      });
      setIsSlide1(true);
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
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="lastMiddleName">
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
        <Form.Group as={Col} md="3" controlId="firstName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tên"
            pattern="[a-zA-ZÀ-Ỹà-ỹ\s']+"
          />
          <Form.Control.Feedback type="invalid">
            Tên không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="specialty">
          <Form.Label>Chuyên Môn</Form.Label>
          <Form.Select required>
            <option>{""}</option>
            {allSpecialty[position === "specialist" ? "Bác sĩ" : position === "nurse" ? "Y tá" : "Nhân viên hỗ trợ"].map((element, index) => {
              return <option key={index}>{element}</option>;
            })}
          </Form.Select>
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
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="dateOfBirth">
          <Form.Label>Ngày sinh</Form.Label>
          <Form.Control type="date" required />
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="citizenID">
          <Form.Label>CCCD</Form.Label>
          <Form.Control
            required
            pattern="\d{12}"
            type="text"
            placeholder="CCCD"
          />
          <Form.Control.Feedback type="invalid">
            CCCD không hợp lệ.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="phoneNum">
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
        <Form.Group as={Col} md="6" controlId="email">
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

export default AddMedicalStaffInfoForm;
