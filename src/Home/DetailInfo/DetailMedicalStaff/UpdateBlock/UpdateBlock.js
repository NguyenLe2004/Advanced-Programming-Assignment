import React, {useContext, useState} from 'react'
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { specialtyContext } from '../../../../Provider/DataProvider';
import "./UpdateBlock.css"
const UpdateBlock = ({medicalStaff}) => {
    const [validated, setValidated] = useState(false);
    const {specialty} = useContext(specialtyContext)
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } 
      else {
        const updatedData = {
          lastMidleName: form.elements.lastMidleName.value,
          firstName: form.elements.firstName.value,
          gender: form.elements.gender.value,
          height: form.elements.height.value,
          weight: form.elements.weight.value,
          phoneNum: form.elements.phoneNum.value,
          specialty : form.elements.specialty.value,
          email: form.elements.email.value,
          citizenID: form.elements.citizenID.value,
          dateOfBirth: formatDate(form.elements.dateOfBirth.value),
          address: form.elements.address.value,
          hometown: form.elements.hometown.value

        };
        axios.patch(`http://localhost:3000/medicalStaff/${medicalStaff.id}`, updatedData)
        .then(response => {
          console.log('Cập nhật thông tin thành công', response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error('Lỗi cập nhật thông tin', error);
        });
      }
      setValidated(true);
      
    };

    const formatDate = (date) => {
      const parts = date.split('-');
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      return formattedDate;
    };
  return (
    <div>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className='outer-form'>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="lastMidleName"  >
          <Form.Label>Họ và tên đệm</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Họ và tên đệm"
            defaultValue={medicalStaff.lastMiddleName}
            pattern="[a-zA-ZÀ-Ỹà-ỹ\s']+"
          />
        </Form.Group>
        <Form.Group as={Col} controlId = "firstName"> 
          <Form.Label>Tên</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Tên"
            defaultValue={medicalStaff.firstName}
            pattern="[a-zA-ZÀ-Ỹà-ỹ\s']+"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3" >
      <Form.Group as={Col} md ='4'  controlId = "gender" >
          <Form.Label>Giới tính</Form.Label>
          <Form.Select defaultValue={medicalStaff.gender}>
            <option>Nam</option>
            <option>Nữ</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md='5' controlId = "phoneNum" >
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control 
            type='tel'
            placeholder='Số điện thoại'
            defaultValue={medicalStaff.phoneNum}
            pattern="^\d{10}"
           required />
        </Form.Group>


      </Row>
      <Row className="mb-3">

        <Form.Group as={Col} md='7' controlId = "email" >
          <Form.Label>Email</Form.Label>
          <Form.Control 
          type = "email"
          placeholder='Email'
          pattern=".+@.+\.[A-Za-z]+$"
          defaultValue={medicalStaff.email}
           required />
        </Form.Group>
        <Form.Group as={Col} md='5' controlId = "specialty" >
          <Form.Label>Chuyên môn</Form.Label>
          <Form.Select 
          defaultValue={medicalStaff.specialty}
           required >
            <option>{""}</option>
            {specialty.map((element,index) => {
              return (
                <option key={index} > {element}</option>
              )
            })}
           </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md='5' controlId = "citizenID" >
          <Form.Label>Căn cước công dân</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Căn cước công dân'
            defaultValue={medicalStaff.citizenID}
           required 
           pattern="^\d{12}"/>
        </Form.Group>
        <Form.Group as={Col} md='5' controlId = "dateOfBirth" >
          <Form.Label>Ngày sinh</Form.Label>
          <Form.Control 
          type="date"
          defaultValue={moment(medicalStaff.dateOfBirth,"DD-MM-YYYY").format("YYYY-MM-DD")}
           required />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}  controlId = "address" >
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control type="text" placeholder="Địa chỉ" defaultValue={medicalStaff.address} required />
          <Form.Control.Feedback type="invalid">
            Hãy nhập địa chỉ hợp lệ
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}  controlId = "hometown" >
          <Form.Label>Quê quán</Form.Label>
          <Form.Control type="text" placeholder="Quê quán" defaultValue={medicalStaff.hometown} required />
          <Form.Control.Feedback type="invalid">
            Hãy nhập quê quán hợp lệ
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" >
        <Form.Check
          required
          label="Đã xem xét kỹ thông tin cập nhập"
          feedback="Bạn phải click "
          feedbackType="invalid"
        />
      </Form.Group>
      <Button variant='outline-primary' type="submit" className='submit-btn'>Lưu thay đổi</Button>
    </Form>
    </div>
  )
}

export default UpdateBlock
