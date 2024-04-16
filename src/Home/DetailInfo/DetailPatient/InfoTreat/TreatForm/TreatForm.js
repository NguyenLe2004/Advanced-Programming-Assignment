import React, { useContext } from 'react'
import "./TreatForm.css"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import { specialtyContext } from '../../../../../Provider/DataProvider';
const TreatForm = ({patient}) => {
  const {allSpecialty} = useContext(specialtyContext);
  const [validated, setValidated] = useState(false);
  const [dateBegin, setDateBegin] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [position, setPosition] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [medStaffID, setMedStaffID] = useState("");
  const [medStaffData, setMedStaffData] = useState([]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else{
      const datetimeBegin = moment(dateBegin);
      const datetimeEnd = moment(dateEnd);
      const newTreatProcess = {
        dateBegin: datetimeBegin.format("DD-MM-YYYY"),
        dateEnd:datetimeEnd.format("DD-MM-YYYY"),
        timeBegin:datetimeBegin.format("HH:mm"),
        timeEnd:datetimeEnd.format("HH:mm"),
        room:form.elements.room.value,
        title:form.elements.title.value,
        description: form.elements.description.value,
        medicalStaffID : medStaffID
      }
      const updateTreatProcessData = [
        ...patient.treatProcess,
        newTreatProcess
      ]
      const addTreatProcess = async () => {
          axios.patch("http://localhost:3000/Patient/" + patient.id, {treatProcess : updateTreatProcessData} )
          .then(response => {
            window.location.reload();
          })
          .catch(error => {
            console.error('Lỗi cập nhật thông tin', error);
          });
      }
      addTreatProcess();
    }
    setValidated(true);
  };

  const getSpecialistStatus = (schedule) => {
    const curDate = moment().format("DD-MM-YYYY");
    const curTime = moment().format("HH-mm");
    let status="Sẵn sàng";
    schedule.forEach(obj => {
      const date = moment(obj.date,"DD-MM-YYYY");
      if(date < curDate) return status;
      if(date === curDate && schedule.timeBegin <= curTime && schedule.timeEnd>=curTime ) {
        return "Đang làm việc";
      }
    });
    return status;
  }

  const handleDisplayMedStaff = () =>{
    let queryStr="";
    if (specialty!=="") queryStr ="specialty="+specialty;
    if (position!=="") queryStr += queryStr? "&position="+position :"position="+position;
    const getMedStaff = async () => {
        try {
          const response = await axios.get("http://localhost:3000/MedicalStaff?" + queryStr ) ;
          const data = response.data;
          data.filter(obj => {
            const status = getSpecialistStatus(obj.schedule);
            return status !== "Đang làm việc"
          });
          setMedStaffData(data);
        } catch (error) {
          console.log(error); 
        }
      };
    getMedStaff();
  }
  return (
    <div className='form-block'>
<Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} xs="6" controlId="dateBegin">
            <Form.Label>Ngày bắt đầu</Form.Label>
            <Form.Control
              required
              onChange={(event) => setDateBegin(event.target.value)}
              type="datetime-local"
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="dateEnd">
            <Form.Label>Thời điểm kết thúc</Form.Label>
            <Form.Control 
              required 
              type="datetime-local"
              onChange={(event) => setDateEnd(event.target.value)}
            />
          </Form.Group>
          </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="title">
              <Form.Label>Điều trị</Form.Label>
              <Form.Control type="text" placeholder="Điều trị" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={3} controlId="room">
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
              <Form.Control type="text" placeholder="Mô tả" defaultValue={"Đang thực hiện"} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md={4} controlId="specialty">
          <Form.Label>Chuyên khoa</Form.Label>
          <Form.Select onChange={(event) => setSpecialty(event.target.value)} >
            <option>{""}</option>
            {position? (
              allSpecialty[position].map((specialty,index) => {
                return <option key={index} >{specialty}</option>
              })
            ) : (
              Object.values(allSpecialty).flatMap((specialties, index) =>
                specialties.map((specialty, subIndex) => (
                  <option key={`${index}-${subIndex}`}>{specialty}</option>
                ))
              )
            )} 
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
            <Form.Group as={Col} md={4} controlId="position">
              <Form.Label>Vị trí</Form.Label>
              <Form.Select onChange={(event) => setPosition(event.target.value)} >
                <option>{""}</option>
                <option>Bác sĩ</option>
                <option>Y tá</option>
                <option>Nhân viên hỗ trợ</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4}  controlId="validationCustom03">
              <Form.Label>Nhân viên y tế</Form.Label>
              <Form.Select disabled={!(dateBegin && dateEnd)} onClick={handleDisplayMedStaff} onChange={(event)=> setMedStaffID(event.target.value)} required>
                <option>{""}</option>
                {medStaffData&&
                  medStaffData.map((obj,index) => {
                    return <option key={index} value={obj.id} > {obj.lastMiddleName +" "+obj.firstName} </option>
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  )
}

export default TreatForm
