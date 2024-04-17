import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { specialtyContext } from '../../../../../Provider/DataProvider';
import { faKitMedical,faMicroscope, faPen, faXmark, faSyringe} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./TreatProcess.css"
const TreatProcess = ({patient}) => {
    const [medStaff, setMedStaff] = useState([]);
    const [isUpdate , setIsUpdate] = useState(null);
    const [validated, setValidated] = useState(false);
    const [dateBegin, setDateBegin] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [position, setPosition] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [medStaffID, setMedStaffID] = useState("");
    const [medStaffData, setMedStaffData] = useState([]);
    const [updateIndex, setUpdateIndex] = useState(0) // can change if use sub collect
    const {allSpecialty} = useContext(specialtyContext);
    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else{
        const datetimeBegin = form.elements.dateBegin.value;
        const datetimeEnd = form.elements.dateEnd.value;
        const newTreatProcess = {
          dateBegin: moment(datetimeBegin).format("DD-MM-YYYY"),
          dateEnd:moment(datetimeEnd).format("DD-MM-YYYY"),
          timeBegin:moment(datetimeBegin).format("HH:mm"),
          timeEnd:moment(datetimeEnd).format("HH:mm"),
          room:form.elements.room.value,
          title:form.elements.title.value,
          description: form.elements.description.value,
          medicalStaffID : medStaffID ? medStaffID : patient.treatProcess[updateIndex].medicalStaffID,
          id :  patient.treatProcess[updateIndex].id
        }
        let updateTreatProcessData = [
          ...patient.treatProcess,
        ]
        updateTreatProcessData[updateIndex]  = newTreatProcess;
  
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
    const isMedicalStaffAvailable = (schedule) => {
      const begin = moment(dateBegin,"DD-MM-YYYY HH:mm");
      const end = moment(dateEnd,"DD-MM-YYYY HH:mm");
      // console.log("here",begin)
      for (let i=schedule.length-1;i>=0;i--){
        const curSchedule = schedule[i];
        // console.log("schedule here" , schedule)
        const curBegin = moment(curSchedule.dateBegin + " " + curSchedule.timeBegin,"DD-MM-YYYY HH:mm" )
        const curEnd = moment(curSchedule.dateEnd + " " + curSchedule.timeEnd,"DD-MM-YYYY HH:mm" )
        if(begin.isAfter(curEnd)) return true;
        if(end.isBefore(curBegin)) continue;
        return false;
      }
      return true;
    }
    const handleDisplayMedStaff = () =>{
      let queryStr="";
      if (specialty!=="") queryStr ="specialty="+specialty;
      if (position!=="") queryStr += queryStr? "&position="+position :"position="+position;
        const getMedStaff = async () => {
          try {
            const response = await axios.get("http://localhost:3000/MedicalStaff?" + queryStr ) ;
            let data = response.data;
            data = data.filter(obj => {
              return( isMedicalStaffAvailable(obj.schedule));
            });
            console.log("data,here" , data)
            setMedStaffData(data);
          } catch (error) {
            console.log(error); 
          }
        };
        getMedStaff();
      }
    useEffect(() => {
        if(!patient) return;
        if(!patient.treatProcess) return;
        const uniqueMedicalStaffIds = new Set();
        patient.treatProcess.forEach(obj => {
            uniqueMedicalStaffIds.add(obj.medicalStaffID);
        });
        const queryString = Array.from(uniqueMedicalStaffIds) 
            .map(id => `id=${id}`)
            .join('&')
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
    },[patient.treatProcess])
    if (!patient.treatProcess) return;
    const getMedStaffByID = (id) => {
        if (!medStaff) return null;
        let medStaffName = null;
        let medStaffPosition = null;
        medStaff.forEach((obj) => {
            if (obj.id === parseInt(id)) {
              medStaffName = obj.lastMiddleName + " "+obj.firstName;
              medStaffPosition = obj.position;
            }
        });
        // console.log(medStaffName,medStaffPosition)
        return {
          medStaffName : medStaffName,
          medStaffPosition : medStaffPosition
        }
    }
    const handleDeleteTreatProcess = (index) => {
      let newTreatProcess = [...patient.treatProcess];
      newTreatProcess.splice(index,1);
      axios.patch("http://localhost:3000/Patient/"+patient.id, {
        treatProcess: newTreatProcess
      }).then(() => window.location.reload())
      .catch((error) => console.error(error))
    }
    const setIcon = (title) =>{
      if(title.includes("xét nghiệm")) {
        return faMicroscope;
      }
      if(title.includes("phẫu thuật")){
        return faSyringe;
      }
      return faKitMedical
     }
  return (
    <div>
      {patient.treatProcess.map((treatment, index) => (
        <div className='treat-circle-block'> 
            <div className={`circle circle-${
              moment(treatment.dateEnd,"DD-MM-YYYY") < moment() ? ( index===0 ? "complete":"complete-task") : "on-going"
            }`}> 
              <FontAwesomeIcon className='icon' icon={setIcon(treatment.title.toLowerCase())} />
            </div>
            <div key={index} className='treat-block'>
              <div className={`icon-in-treatform ${index === isUpdate? "close":null}`}><FontAwesomeIcon icon={index === isUpdate? faXmark:faPen} onClick={() => {
                setIsUpdate(isUpdate === index ? null : index);
                setDateBegin(treatment.dateBegin + " " + treatment.timeBegin);
                setDateEnd(treatment.dateEnd + " " + treatment.timeEnd);
              }}/> </div>
              {!(index===isUpdate) ? (
                <div> 
                  <div className='room-date'> 
                    <div className='date'>{treatment.dateBegin.split('-').join('/')} {treatment.timeBegin}  -  {treatment.dateEnd.split('-').join('/')} {treatment.timeEnd}</div>
                    <div className='room'>{treatment.room}</div> 
                  </div>
                  <div className='title'>{treatment.title}</div>
                  <div className='specialist'>
                    <span>{getMedStaffByID(treatment.medicalStaffID).medStaffPosition +": "}</span> 
                    <span><a href={`/MedicalStaff/${getMedStaffByID(treatment.medicalStaffID).medStaffPosition}/${treatment.medicalStaffID}`}>{getMedStaffByID(treatment.medicalStaffID).medStaffName}</a></span>
                  </div>
                  <div> 
                    <div className='description'> {treatment.description} </div>
                  </div>
                </div>
              ):(
                <div> 
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs="4" controlId="dateBegin">
                      <Form.Label>Thời điểm bắt đầu</Form.Label>
                      <Form.Control
                        required
                        onChange={(event) => {
                          setDateBegin(moment(event.target.value).format("DD-MM-YYYY HH:mm"));
                          setMedStaffID("");
                        }}
                        type="datetime-local"
                        defaultValue={moment(treatment.dateBegin + " " + treatment.timeBegin,"DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")}
                      />
                    </Form.Group> 
                    <Form.Group as={Col} md="4" controlId="dateEnd">
                      <Form.Label>Thời điểm kết thúc</Form.Label>
                      <Form.Control 
                        required 
                        type="datetime-local"
                        onChange={(event) => {
                          setDateEnd(moment(event.target.value ).format("DD-MM-YYYY HH:mm"));
                          setMedStaffID("");
                        }}
                        defaultValue={moment(treatment.dateEnd + " " + treatment.timeEnd,"DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="room">
                      <Form.Label>Phòng</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Phòng"
                          aria-describedby="inputGroupPrepend"
                          defaultValue={treatment.room}
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
                          defaultValue={treatment.title}
                         required />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid city.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="3">
                      <Form.Label>{getMedStaffByID(treatment.medicalStaffID).medStaffPosition}</Form.Label>
                        <Form.Control
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          defaultValue={getMedStaffByID(treatment.medicalStaffID).medStaffName}
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
                        defaultValue={treatment.description} 
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
                        <Form.Select onChange={(event) => setSpecialty(event.target.value)} defaultValue={treatment.specialty} >
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
                        <Form.Select onChange={(event) => setPosition(event.target.value)} defaultValue={treatment.position} >
                          <option>{""}</option>
                          <option value={"Y tá"}>Y tá</option>
                          <option value={"Bác sĩ"}>Bác sĩ</option>
                          <option value={"Nhân viên hỗ trợ"}>Nhân viên hỗ trợ</option>
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
                         value={medStaffID}
                         >
                          <option value={""}>{""}</option>
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
                  {medStaffID && 
                    <Row className='mb-3'>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="8" controlId="title">
                            <Form.Label>Điều trị</Form.Label>
                            <Form.Control
                            type="text"
                              placeholder="Điều trị"
                              defaultValue={treatment.title}
                            required />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid city.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="3">
                          <Form.Label>{getMedStaffByID(treatment.medicalStaffID).medStaffPosition}</Form.Label>
                            <Form.Control
                              type="text"
                              aria-describedby="inputGroupPrepend"
                              defaultValue={getMedStaffByID(treatment.medicalStaffID).medStaffName}
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
                            defaultValue={treatment.description} 
                            required />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid city.
                            </Form.Control.Feedback>
                          </Form.Group>
                      </Row>
                    </Row>
                  }
                  <Button onClick={() => setUpdateIndex(index)} type="submit" >Đổi thông tin lịch trình</Button>
                  <Button style={{position:"absolute",right:"1vw"}} onClick={() => handleDeleteTreatProcess(index)} variant='danger'>Xoá tiến trình này</Button>
                </Form>
                </div>
              )}
            </div>
        </div>

      ))}
    </div>
  )
}

export default TreatProcess;