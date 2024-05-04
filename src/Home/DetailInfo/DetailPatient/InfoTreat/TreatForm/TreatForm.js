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
import { useParams } from 'react-router-dom';
const TreatForm = ({patient}) => {
  const {allSpecialty} = useContext(specialtyContext);
  const [validated, setValidated] = useState(false);
  const [dateBegin, setDateBegin] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [position, setPosition] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [medStaffID, setMedStaffID] = useState("");
  const [medStaffData, setMedStaffData] = useState([]);
  const [error, setError] = useState("")
  const {id} = useParams();
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else{
      const Begin = moment(form.elements.datetimeBegin.value)
      const End = moment(form.elements.datetimeEnd.value)
      const curDay = moment()
        if(curDay.isAfter(Begin)){
          setError("thời điểm bắt đầu và kết thúc không hợp lệ")
          return;
        }
        else if(Begin.isAfter(End)){
          setError("thời điểm bắt đầu và kết thúc không hợp lệ")
          return;
        }
      const [dateBegin, timeBegin] = form.elements.datetimeBegin.value.split("T");
      const [dateEnd, timeEnd] = form.elements.datetimeBegin.value.split("T")
      const newTreatProcess = {
        dateBegin: moment(dateBegin).format("DD-MM-YYYY"),
        dateEnd:moment(dateEnd).format("DD-MM-YYYY"),
        timeBegin:timeBegin,
        timeEnd:timeEnd,
        room:form.elements.room.value,
        title:form.elements.title.value,
        description: form.elements.description.value,
        medicalStaffID : medStaffID
      }
      const addTreatProcess = async () => {
          axios.post(`http://localhost:8080/v1/patients/${id}/treatProcess`, newTreatProcess )
          .then(() => {
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

  const isMedicalStaffAvailable = (schedule) => {
    const begin = moment(dateBegin,"DD-MM-YYYY HH:mm");
    const end = moment(dateEnd,"DD-MM-YYYY HH:mm");
    for (let i=schedule.length-1;i>=0;i--){
      const curSchedule = schedule[i];
      const curBegin = moment(curSchedule.dateBegin + " " + curSchedule.timeBegin,"DD-MM-YYYY HH:mm" )
      const curEnd = moment(curSchedule.dateEnd + " " + curSchedule.timeEnd,"DD-MM-YYYY HH:mm" )
      if(begin.isAfter(curEnd)) return true;
      if(end.isBefore(curBegin)) continue;
      return false;
    }
    return true;
  }

  const handleDisplayMedStaff = () => {
    let queryStr = "";
    if (specialty !== "") queryStr = "specialty=" + (specialty);
    if (position !== "")
      queryStr += queryStr ? "&position=" + (position) : "position=" + (position);
    const getMedStaff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/specialists?" + queryStr
        )
        console.log("http://localhost:8080/v1/specialists?" + queryStr)
            let dataWithSchedule = await Promise.all(  await response.data.map(async item => {
              const response_schedule = await axios.get(`http://localhost:8080/v1/specialists/${item.id}/schedules`);
              const schedule = response_schedule.data;
              schedule.sort((a, b) => {
                const dateA = moment(a.date, "DD-MM-YYYY");
                const dateB = moment(b.date, "DD-MM-YYYY");
                if (dateA.isSame(dateB)) {
                  return moment(a.timeBegin, "HH-mm") - moment(b.timeBegin, "HH-mm");
                }
                return dateA - dateB;
              });
              return {...item,schedule};
            }));
        dataWithSchedule = dataWithSchedule.filter((obj) => {
          return isMedicalStaffAvailable(obj.schedule);
        });
        console.log("data here", dataWithSchedule);
        setMedStaffData(dataWithSchedule); 
      } catch (error) {
        console.log(error);
      }
    };
    getMedStaff();
  };
  return (
    <div className='form-block'>
<Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
    {error &&
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
      }
          <Form.Group as={Col} xs="6" controlId="datetimeBegin">
            <Form.Label>Thời điểm bắt đầu</Form.Label>
            <Form.Control
              required
              onChange={(event) => setDateBegin(moment(event.target.value).format("DD-MM-YYYY HH:mm"))}
              type="datetime-local"
            />
            <Form.Control.Feedback type="invalid">
            Thông tin không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="datetimeEnd">
            <Form.Label>Thời điểm kết thúc</Form.Label>
            <Form.Control 
              required 
              type="datetime-local"
              onChange={(event) => setDateEnd(moment(event.target.value).format("DD-MM-YYYY HH:mm"))}
            />
            <Form.Control.Feedback type="invalid">
            Thông tin không hợp lệ
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="title">
              <Form.Label>Điều trị</Form.Label>
              <Form.Control type="text" placeholder="Điều trị" required />
              <Form.Control.Feedback type="invalid">
                Thông tin không hợp lệ
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
              <Form.Control.Feedback type="invalid">
              Thông tin không hợp lệ
              </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="description">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control type="text" placeholder="Mô tả" defaultValue={"Đang thực hiện"} required />
              <Form.Control.Feedback type="invalid">
                Thông tin không hợp lệ
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
        </Form.Group>
            <Form.Group as={Col} md={4} controlId="position">
              <Form.Label>Vị trí</Form.Label>
              <Form.Select onChange={(event) => setPosition(event.target.value)} >
                <option>{""}</option>
                <option>Bác sĩ</option>
                <option>Y tá</option>
                <option>Nhân viên hỗ trợ</option>
              </Form.Select>
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
                thông tin không hợp lệ
              </Form.Control.Feedback>
            </Form.Group>
             </Row>
              {/* {medStaffID && 
                    <Row className='mb-3'>
                      <Row className="mb-3">
                        <Form.Group controlId="medstaffTitle">
                            <Form.Label>Công việc</Form.Label>
                            <Form.Control
                            type="text"
                              placeholder="Công việc"
                            required />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid city.
                            </Form.Control.Feedback>
                          </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group controlId="medstaffDescription">
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
                    </Row>
                  } */}
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  )
}

export default TreatForm
