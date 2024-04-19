import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddEquipmentMaintainForm = ({maintain,setMaintain}) => {
    const [validatedMaintain, setValidatedMaintain] = useState(false);

    const handleDeleteMaintain = (index) => {
      setMaintain((prevMaintain) =>
        prevMaintain.filter((_, i) => i !== index)
      );
    };
    const handleSubmitMaintain = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      // console.log(form)
      if (form.checkValidity() === false) {
        event.stopPropagation();
        // setValidatedMaintain(true);
      } else {
        // setMaintain([
        //   ...maintain,
        //   {
        //     description:form.elements.description.value,
        //     dateBegin: form.elements.dateBegin.value,
        //     dateEnd: form.elements.dateEnd.value,
        //   },
        // ]);
        // form.reset();   
        // setValidatedMaintain(false);
      }
      setValidatedMaintain(true);
    };
  return (
    <div>
    <Form 
      style={{ padding: "0vh 1vw" }}
      noValidate
      validated={validatedMaintain}
      onSubmit={handleSubmitMaintain}
    >
      <Row className="mb-3">
        <Form.Group controlId="description">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control type="text" placeholder="Mô tả" required />
          <Form.Control.Feedback type="invalid">
            Thông tin không hợp lệ
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="dateBegin">
          <Form.Label>Ngày bắt đầu</Form.Label>
          <Form.Control type="date" required />
          <Form.Control.Feedback type="invalid">
            Thông tin không hợp lệ
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="dateEnd">
          <Form.Label>Ngày kết thúc</Form.Label>
          <Form.Control type="date" required />
          <Form.Control.Feedback type="invalid" required>
            Thông tin không hợp lệ
          </Form.Control.Feedback>
        </Form.Group>
        <Col style={{border:"1px red solid",position:"relative"}}>
          <div style={{border:"1px solid blue",position:"relative",height:"100%",maxHeight:"100%"}}>
            <Button type="submit" style={{position:"absolute",bottom:"0"}}  onClick={handleSubmitMaintain}> Thêm bảo trì </Button>
          </div>
        </Col>
      </Row>
    </Form>-
    </div>
  );
};

export default AddEquipmentMaintainForm;
