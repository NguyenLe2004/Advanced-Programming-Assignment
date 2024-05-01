import React, { useState } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./MedInfoBlock.css";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
const MedInfoBlock = ({ patient }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [validated, setValidated] = useState(false);
  const {id} = useParams();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const updateData = {
        height: form.elements.height.value,
        weight: form.elements.weight.value,
        bloodType: form.elements.bloodType.value,
        medHistory: form.elements.medHistory.value,
        symptoms: form.elements.symptoms.value,
        diagnosis: form.elements.diagnosis.value,
      };
      axios
        .patch("http://localhost:8080/v1/patients/updateInfoMedical/" + id, updateData)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setValidated(true);
  };
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="med-info-block">
        <div className="pen-to-square-icon-med">
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ position: "relative" }}
            onClick={() => setIsUpdate((prevState) => !prevState)}
          />
        </div>
        <h3 className="title-med-info">Thông tin y tế</h3>
        {!isUpdate ? (
          <Container>
            <Row className="mb-3">
              <Col md="4">Chiều cao:</Col>
              <Col>{patient.height} cm</Col>
            </Row>
            <Row className="mb-3">
              <Col md="4">Cân nặng:</Col>
              <Col>{patient.weight} kg</Col>
            </Row>
            <Row className="mb-3">
              <Col md="4">Nhóm máu:</Col>
              <Col>{patient.bloodType}</Col>
            </Row>
            <Row className="mb-3">
              <Col md="4">Lịch sử bệnh án:</Col>
              <Col>{patient.medHistory}</Col>
            </Row>
            <Row className="mb-3">
              <Col md="4">Triệu chứng bệnh:</Col>
              <Col>{patient.symptoms}</Col>
            </Row>
            <Row className="mb-3">
              <Col md="4">Chẩn đoán của bác sĩ:</Col>
              <Col>{patient.diagnosis}</Col>
            </Row>
          </Container>
        ) : (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="height">
                <Form.Label>Chiều cao</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Chiều cao"
                    aria-describedby="inputGroupPrepend"
                    defaultValue={patient.height}
                    required
                    pattern="[0-9]{1,3}"
                  />
                  <Form.Control.Feedback type="invalid">
                    Chiều cao không hợp lệ.
                  </Form.Control.Feedback>
                  <InputGroup.Text id="inputGroupPrepend">cm</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="weight">
                <Form.Label> Cân nặng</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Cân nặng"
                    aria-describedby="inputGroupPrepend"
                    defaultValue={patient.weight}
                    required
                    pattern="[0-9]{1,3}"
                  />
                  <Form.Control.Feedback type="invalid">
                    Cân nặng không hợp lệ.
                  </Form.Control.Feedback>
                  <InputGroup.Text id="inputGroupPrepend">kg</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="bloodType">
                <Form.Label>Nhóm máu</Form.Label>
                <Form.Select required defaultValue={patient.bloodType}>
                  <option>{""}</option>
                  <option>A</option>
                  <option>B</option>
                  <option>AB</option>
                  <option>O</option>
                  <option>Chưa rõ </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Nhóm máu không hợp lệ.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="medHistory">
                <Form.Label>Lịch sử bệnh án</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lịch sử bệnh án"
                  defaultValue={patient.medHistory}
                  required
                  pattern="[a-zA-ZÀ-Ỹà-ỹ\s']+"
                />
                <Form.Control.Feedback type="invalid">
                  Lịch sử bệnh án không hợp lệ.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="symptoms">
                <Form.Label>Triệu chứng bệnh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Triệu chứng bệnh"
                  defaultValue={patient.symptoms}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Triệu chứng không hợp lệ.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="diagnosis">
                <Form.Label>Chẩn đoán</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Chẩn đoán"
                  defaultValue={patient.diagnosis}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Chẩn đoán không hợp lệ.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button
              type="submit"
              style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
            >
              Submit form
            </Button>
          </Form>
        )}
        {!isUpdate && (
          <Button
            style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
            onClick={handleScroll}
          >
            Xem tiến trình điều trị
          </Button>
        )}
      </div>
    </div>
  );
};

export default MedInfoBlock;
