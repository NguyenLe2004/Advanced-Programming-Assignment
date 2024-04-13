import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { faKitMedical,faMicroscope, faPen, faXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./ScheduleProcess.css"
const ScheduleProcess = ({medicalStaff}) => {
    const [medStaff, setMedStaff] = useState([]);
    const [isUpdate , setIsUpdate] = useState(null);
    const [validated, setValidated] = useState(false);
    const [dateBegin, setDateBegin] = useState("a");
    const [dateEnd, setDateEnd] = useState("a");
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
        const newScheduleProcess = {
          dateBegin: datetimeBegin.format("DD-MM-YYYY"),
          dateEnd:datetimeEnd.format("DD-MM-YYYY"),
          timeBegin:datetimeBegin.format("HH:mm"),
          timeEnd:datetimeEnd.format("HH:mm"),
          room:form.elements.room.value,
          title:form.elements.title.value,
          description: form.elements.description.value,
          medicalStaffID : medStaffID
        }
        const updateScheduleProcessData = [
          ...medicalStaff.schedule,
          newScheduleProcess
        ]
        console.log(updateScheduleProcessData);
        const addScheduleProcess = async () => {
            axios.patch("http://localhost:3000/medicalStaff/" + medicalStaff.id, {schedule : updateScheduleProcessData} )
            .then(response => {
              window.location.reload();
            })
            .catch(error => {
              console.error('Lỗi cập nhật thông tin', error);
            });
        }
        addScheduleProcess();
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
    useEffect(() => {
        if(!medicalStaff) return;
        if(!medicalStaff.schedule) return;
        const uniqueDoctorIds = new Set();
        medicalStaff.schedule.forEach(obj => {
            uniqueDoctorIds.add(obj.medicalStaffID);
        });
        const queryString = Array.from(uniqueDoctorIds) 
            .map(id => `id=${id}`)
            .join('&')
        console.log("string query here",queryString)
        const getMedStaff = async () => {
            try {
                const response = await axios.get("http://localhost:3000/MedicalStaff?" + queryString);
                console.log("api call",response.data)
                setMedStaff(response.data);
              } catch (error) {
                console.log(error); 
              }
        }
        getMedStaff();
    },[medicalStaff.schedule])
    if (!medicalStaff.schedule) return;
    const getMedStaffByID = (id) => {
        if (!medStaff) return null;
        let medStaffName = null;
        let medStaffPosition = null;
        medStaff.forEach((obj) => {
            if (obj.id === id) {
              medStaffName = obj.lastMiddleName + " "+obj.firstName;
              medStaffPosition = obj.position;
            }
        });
        return {
          medStaffName : medStaffName,
          medStaffPosition : medStaffPosition
        }
    }
  return (
    <div>
      {medicalStaff.schedule.map((schedule, index) => (
        <div className='treat-circle-block'> 
            <div className={`circle circle-${
              moment(schedule.dateEnd,"DD-MM-YYYY") < moment() ? ( index===0 ? "complete":"complete-task") : "on-going"
            }`}> 
              <FontAwesomeIcon className='icon' icon={faMicroscope} />
            </div>
            <div key={index} className='treat-block'>
              <div className={`icon-in-treatform ${index === isUpdate? "close":null}`}><FontAwesomeIcon icon={index === isUpdate? faXmark:faPen} onClick={() => setIsUpdate(isUpdate === index ? null : index)}/> </div>
              {!(index===isUpdate) ? (
                <div> 
                  <div className='room-date'> 
                    <div className='date'>{schedule.date.split('-').join('/')} {schedule.timeBegin}  -  {schedule.timeEnd}</div>
                  </div>
                  <div className='title'>{schedule.title}</div>
                  <div className='specialist'>
                    <span>{getMedStaffByID(schedule.medicalStaffID).medStaffPosition +": "}</span> 
                    <span><a href={`/MedicalStaff/${schedule.medicalStaffID}`}>{getMedStaffByID(schedule.medicalStaffID).medStaffName}</a></span>
                  </div>
                  <div> 
                    <div className='description'> {schedule.description} </div>
                  </div>
                </div>
              ):(
                <div> 
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs="4" controlId="dateBegin">
                      <Form.Label>Ngày bắt đầu</Form.Label>
                      <Form.Control
                        required
                        onChange={(event) => setDateBegin(event.target.value)}
                        type="datetime-local"
                        defaultValue={moment(schedule.dateBegin + " " + schedule.timeBegin,"DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")}
                      />
                    </Form.Group> 
                    <Form.Group as={Col} md="4" controlId="dateEnd">
                      <Form.Label>Thời điểm kết thúc</Form.Label>
                      <Form.Control 
                        required 
                        type="datetime-local"
                        onChange={(event) => setDateEnd(event.target.value)}
                        defaultValue={moment(schedule.dateEnd + " " + schedule.timeEnd,"DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")}
                      />
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
                    </Form.Group>
                    
                    </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="title">
                        <Form.Label>Điều trị</Form.Label>
                        <Form.Control
                         type="text"
                          placeholder="Điều trị"
                          defaultValue={schedule.title}
                         required />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid city.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="3" controlId="room">
                      <Form.Label>{getMedStaffByID(schedule.medicalStaffID).medStaffPosition}</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Phòng"
                          aria-describedby="inputGroupPrepend"
                          defaultValue={getMedStaffByID(schedule.medicalStaffID).medStaffName}
                          disabled
                        />
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
                          Please provide a valid city.
                        </Form.Control.Feedback>
                      </Form.Group>
                  </Row>
                  <Row className='mb-3'><h5>Thay đổi nhân viên y tế</h5></Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md={4} controlId="specialty">
                        <Form.Label>Chuyên khoa</Form.Label>
                        <Form.Select onChange={(event) => setSpecialty(event.target.value)} defaultValue={schedule.specialty} >
                          <option>{""}</option>
                          <option>Tim mạch</option>
                          <option>Sản</option>
                          <option>Não</option>
                          <option>Tiêu hoá</option>
                          <option>Hô Hấp</option>
                          <option>Tâm thần</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid city.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md={4} controlId="position">
                        <Form.Label>Vị trí</Form.Label>
                        <Form.Select onChange={(event) => setPosition(event.target.value)} defaultValue={schedule.position} >
                          <option>{""}</option>
                          <option>Y tá</option>
                          <option>Bác sĩ</option>
                          <option>Nhân viên hỗ trợ</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid city.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md={4}  controlId="validationCustom03">
                        <Form.Label>Nhân viên y tế</Form.Label>
                        <Form.Select
                         disabled={!(dateBegin && dateEnd)} 
                         onClick={handleDisplayMedStaff} 
                         onChange={(event)=> setMedStaffID(event.target.value)} 
                         required>
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
              )}
            </div>
        </div>

      ))}
    </div>
  )
}

export default ScheduleProcess;