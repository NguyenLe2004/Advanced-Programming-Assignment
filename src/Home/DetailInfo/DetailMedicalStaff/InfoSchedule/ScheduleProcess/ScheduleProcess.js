import React, { useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { faKitMedical,faMicroscope, faPen, faXmark,faComments,faSyringe} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./ScheduleProcess.css"
const ScheduleProcess = ({medicalStaff}) => {
    const [isUpdate , setIsUpdate] = useState(null);
    const [validated, setValidated] = useState(false);
    const [scheduleID, setScheduleID] = useState(1);

    const handleDeleteSchedule = (id) => {
      let newSchedule = [...medicalStaff.schedule];
      newSchedule.splice(id,1);
      axios.patch("http://localhost:3000/MedicalStaff/"+medicalStaff.id, {
        schedule: newSchedule
      }).then(() => window.location.reload())
      .catch((error) => console.error(error))
    }

    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else{
        let schedule = [...medicalStaff.schedule];
        const [dateBegin, timeBegin] = form.elements.datetimeBegin.value.split("T");
        const [dateEnd, timeEnd] = form.elements.datetimeEnd.value.split("T");
        schedule[scheduleID] = {
          dateBegin : dateBegin,
          timeBegin : timeBegin,
          dateEnd : dateEnd,
          timeEnd : timeEnd,
          room:form.elements.room.value,
          title:form.elements.title.value,
          description: form.elements.description.value
        }
        console.log("schedule here",schedule)
        axios.patch("http://localhost:3000/medicalStaff/" + medicalStaff.id, {
          schedule : schedule
        } )
        .then(() => {
          window.location.reload();
        })
        .catch(error => {
          console.error( error);
        });
      }
      setValidated(true);
    };
    const setIcon = (title) =>{
      if(title.includes("họp")) {
        return faComments;
      }
      if(title.includes("xét nghiệm")) {
        return faMicroscope;
      }
      if(title.includes("phẫu thuật")){
        return faSyringe;
      }
      return faKitMedical
     }
    if (!medicalStaff.schedule) return;
  return (
    <div>
      {medicalStaff.schedule.map((schedule, index) => (
        <div className='treat-circle-block'> 
            <div className={`circle circle-${
            (  moment(schedule.dateBegin+" "+schedule.timeBegin,"DD-MM-YYYY HH:mm") < moment() &&
              moment(schedule.dateEnd+" "+schedule.timeEnd,"DD-MM-YYYY HH:mm") < moment()
            ) ?  "complete": "on-going"
            }`}> 
              <FontAwesomeIcon className='icon' icon={setIcon(schedule.title.toLowerCase())} />
            </div>
            <div key={index} className='treat-block'>
              <div className={`icon-in-treatform ${index === isUpdate? "close":null}`}><FontAwesomeIcon icon={index === isUpdate? faXmark:faPen} onClick={() => setIsUpdate(isUpdate === index ? null : index)}/> </div>
              {!(index===isUpdate) ? (
                <div> 
                  <div className='room-date'> 
                    <div className='date'>{schedule.dateBegin.split('-').join('/')} {schedule.timeBegin} - {schedule.dateEnd.split('-').join('/')} {schedule.timeEnd}</div>
                    <div className='room'>{schedule.room}</div>

                  </div>
                  <div> 
                    <div className='title'> {schedule.title} </div>
                    <div className='description'> {schedule.description} </div>

                  </div>
                </div>
              ):(
                <div> 
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="datetimeBegin">
                      <Form.Label>Thời điểm bắt đầu</Form.Label>
                      <Form.Control 
                        required 
                        type="datetime-local"
                        defaultValue={moment(schedule.dateBegin + " " + schedule.timeBegin, "DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")}
                      />
                    <Form.Control.Feedback type="invalid">
                    Thông tin không hợp lệ
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="datetimeEnd">
                      <Form.Label>Thời điểm kết thúc</Form.Label>
                      <Form.Control 
                        required 
                        type="datetime-local"
                        defaultValue={moment(schedule.dateEnd + " " + schedule.timeEnd, "DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")}
                      />
                    <Form.Control.Feedback type="invalid">
                    Thông tin không hợp lệ
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="room">
                      <Form.Label>Phòng</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Phòng"
                          aria-describedby="inputGroupPrepend"
                          defaultValue={schedule.room}
                          required
                        />
                    <Form.Control.Feedback type="invalid">
                    Thông tin không hợp lệ
                    </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                  <Row className="mb-3">
                    <Form.Group controlId="title">
                        <Form.Label>Công việc</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Công việc" 
                        defaultValue={schedule.title} 
                        required />
                        <Form.Control.Feedback type="invalid">
                         Công việc không hợp lệ
                        </Form.Control.Feedback>
                      </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group controlId="description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Mô tả" 
                        defaultValue={schedule.description} 
                        required />
                    <Form.Control.Feedback type="invalid">
                    Thông tin không hợp lệ
                    </Form.Control.Feedback>
                      </Form.Group>
                  </Row>
                  <Button type="submit" onClick={() => setScheduleID(index)}>Đổi thông tin lịch</Button>
                  <Button style={{position:"absolute",right:"1vw"}} onClick={()=>handleDeleteSchedule(index)} variant='danger'> Xoá lịch</Button>
                </Form>
                </div>
              )}
            </div>
        </div>
      ))}
    </div>
  )
}

export default ScheduleProcess;