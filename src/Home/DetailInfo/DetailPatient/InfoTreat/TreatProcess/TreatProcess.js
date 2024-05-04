import React, { useContext, useEffect, useState } from "react";
import axios, { all } from "axios";
import moment from "moment";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { specialtyContext } from "../../../../../Provider/DataProvider";
import {
  faKitMedical,
  faMicroscope,
  faPen,
  faXmark,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import "./TreatProcess.css";

const TreatProcess = ({ patient }) => {
  const [medStaff, setMedStaff] = useState([]);
  const [isUpdate, setIsUpdate] = useState(null);
  const [validated, setValidated] = useState(false);
  const [dateBegin, setDateBegin] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [position, setPosition] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [medStaffID, setMedStaffID] = useState("");
  const [medStaffData, setMedStaffData] = useState([]);
  const [curTreatProcess, setCurTreatProcess] = useState(null);
  const { allSpecialty } = useContext(specialtyContext);
  const [error, setError] = useState("");
  const {id} = useParams();
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const datetimeBegin = form.elements.dateBegin.value;
      const datetimeEnd = form.elements.dateEnd.value;
      const Begin = moment(datetimeBegin);
      const End = moment(datetimeEnd);
      if (Begin.isAfter(End)) {
        setError("thời điểm bắt đầu và kết thúc không hợp lệ");
        return;
      }
      const newTreatProcess = {
        dateBegin: moment(datetimeBegin).format("DD-MM-YYYY"),
        dateEnd: moment(datetimeEnd).format("DD-MM-YYYY"),
        timeBegin: moment(datetimeBegin).format("HH:mm"),
        timeEnd: moment(datetimeEnd).format("HH:mm"),
        room: form.elements.room.value,
        title: form.elements.title.value,
        description: form.elements.description.value,
        medicalStaffID: form.elements.medicalStaffID.value
          ? form.elements.medicalStaffID.value
          : curTreatProcess.medicalStaffID,
      };
      const addTreatProcess = async () => {
        axios
          .put(
            `http://localhost:8080/v1/patients/${id}/treatProcess/${curTreatProcess.id}`,
            newTreatProcess
          )
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.error("Lỗi cập nhật thông tin", error);
          });
      };
      addTreatProcess();
    }
    setValidated(true);
  };
  const isMedicalStaffAvailable = (schedule) => {
    const begin = moment(dateBegin, "DD-MM-YYYY HH:mm");
    const end = moment(dateEnd, "DD-MM-YYYY HH:mm");
    // console.log("here",begin)
    for (let i = schedule.length - 1; i >= 0; i--) {
      const curSchedule = schedule[i];
      // console.log("schedule here" , schedule)
      const curBegin = moment(
        curSchedule.dateBegin + " " + curSchedule.timeBegin,
        "DD-MM-YYYY HH:mm"
      );
      const curEnd = moment(
        curSchedule.dateEnd + " " + curSchedule.timeEnd,
        "DD-MM-YYYY HH:mm"
      );
      if (begin.isAfter(curEnd)) return true;
      if (end.isBefore(curBegin)) continue;
      return false;
    }
    return true;
  };
  const handleDisplayMedStaff = () => {
    let queryStr = "";
    if (specialty !== "") queryStr = "specialty=" + encodeURI(specialty);
    if (position !== "")
      queryStr += queryStr ? "&position=" + encodeURI(position) : "position=" + encodeURI(position);
    const getMedStaff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/specialists?" + queryStr
        )
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
  if (!patient.treatProcess) return;

  const getMedStaffByID = (id) => {
    if (!medStaff) return null;
    console.log(id);
    console.log(medStaff);
    let medStaffName = null;
    let medStaffPosition = null;
    medStaff.forEach((obj) => {
      if (obj.id === id) {
        medStaffName = obj.lastMiddleName + " " + obj.firstName;
        medStaffPosition = obj.position;
        return;
      }
    });
    // console.log(medStaffName,medStaffPosition)
    return {
      medStaffName: medStaffName,
      medStaffPosition: medStaffPosition,
    };
  };
  const handleDeleteTreatProcess = (idTP) => {
    axios
      .delete(
        `http://localhost:8080/v1/patients/${id}/treatProcess/${idTP}`
      )
      .then(() => window.location.reload())
      .catch((error) => console.error(error));
  };
  const setIcon = (title) => {
    if (title.includes("xét nghiệm")) {
      return faMicroscope;
    }
    if (title.includes("phẫu thuật")) {
      return faSyringe;
    }
    return faKitMedical;
  };
  return (
    <div>
      {patient.treatProcess.map((treatment, index) => (
        <div key={index} className="treat-circle-block">
          <div
            className={`circle circle-${
              moment(treatment.dateEnd, "DD-MM-YYYY") < moment()
                ? index === 0
                  ? "complete"
                  : "complete-task"
                : "on-going"
            }`}
          >
            <FontAwesomeIcon
              className="icon"
              icon={setIcon(treatment.title.toLowerCase())}
            />
          </div>
          <div className="treat-block">
            <div
              className={`icon-in-treatform ${
                index === isUpdate ? "close" : null
              }`}
            >
              <FontAwesomeIcon
                icon={index === isUpdate ? faXmark : faPen}
                onClick={() => {
                  setCurTreatProcess(treatment);
                  setIsUpdate(isUpdate === index ? null : index);
                  setDateBegin(treatment.dateBegin + " " + treatment.timeBegin);
                  setDateEnd(treatment.dateEnd + " " + treatment.timeEnd);
                }}
              />{" "}
            </div>
            {!(index === isUpdate) ? (
              <div>
                <div className="room-date">
                  <div className="date">
                    {treatment.dateBegin.split("-").join("/")}{" "}
                    {treatment.timeBegin} -{" "}
                    {treatment.dateEnd.split("-").join("/")} {treatment.timeEnd}
                  </div>
                  <div className="room">{treatment.room}</div>
                </div>
                <div className="title">{treatment.title}</div>
                <div className="specialist">
                  <span>
                    {treatment.specialistPosition + " "} 
                  </span>
                  <span>
                    <a
                      href={`/MedicalStaff/${
                          treatment.position ==="Bác sĩ" ? "specialist" : treatment.position ==="Y tá" ? "nurse" : "supportStaff"
                      }/${treatment.medicalStaffID}`}
                    >
                      {treatment.specialistName}
                    </a>
                  </span>
                </div>
                <div>
                  <div className="description"> {treatment.description} </div>
                </div>
              </div>
            ) : (
              <div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    {error && (
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
                    )}
                    <Form.Group as={Col} xs="4" controlId="dateBegin">
                      <Form.Label>Thời điểm bắt đầu</Form.Label>
                      <Form.Control
                        required
                        onChange={(event) => {
                          setDateBegin(
                            moment(event.target.value).format(
                              "DD-MM-YYYY HH:mm"
                            )
                          );
                          setMedStaffID("");
                        }}
                        type="datetime-local"
                        defaultValue={moment(
                          treatment.dateBegin + " " + treatment.timeBegin,
                          "DD-MM-YYYY HH:mm"
                        ).format("YYYY-MM-DDTHH:mm")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Thông tin không hợp lệ
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="dateEnd">
                      <Form.Label>Thời điểm kết thúc</Form.Label>
                      <Form.Control
                        required
                        type="datetime-local"
                        onChange={(event) => {
                          setDateEnd(
                            moment(event.target.value).format(
                              "DD-MM-YYYY HH:mm"
                            )
                          );
                          setMedStaffID("");
                        }}
                        defaultValue={moment(
                          treatment.dateEnd + " " + treatment.timeEnd,
                          "DD-MM-YYYY HH:mm"
                        ).format("YYYY-MM-DDTHH:mm")}
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
                        defaultValue={treatment.room}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Thông tin không hợp lệ
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="title">
                      <Form.Label>Công việc</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Điều trị"
                        defaultValue={treatment.title}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Công việc không hợp lệ
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                      <Form.Label>
                        { 
                          treatment.specialistPosition
                        }
                      </Form.Label>
                      <Form.Control
                        type="text"
                        aria-describedby="inputGroupPrepend"
                        defaultValue={
                          treatment.specialistName
                        }
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
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Thông tin không hợp lệ
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <h5>Thay đổi nhân viên y tế</h5>
                  </Row>
                  <Row className="mb-3">
                  <Form.Group as={Col} md={4} controlId="specialty">
                    <Form.Label>Chuyên khoa</Form.Label>
                    <Form.Select
                      onChange={(event) => setSpecialty(event.target.value)}
                      defaultValue={treatment.specialty}
                    >
                      <option>{""}</option>
                      {position
                        ? allSpecialty[position].map((specialty, index) => {
                            return <option key={index}>{specialty}</option>;
                          })
                        : (() => {
                            // Tạo một mảng tạm để lưu trữ các specialty đã được render
                            let renderedSpecialties = [];

                            return Object.values(allSpecialty).flatMap(
                              (specialties, index) =>
                                specialties.map((specialty, subIndex) => {
                                  // Kiểm tra xem specialty đã được render trước đó chưa
                                  if (renderedSpecialties.includes(specialty)) {
                                    return null; // Nếu specialty đã tồn tại, không render option mới
                                  } else {
                                    // Nếu specialty chưa tồn tại, thêm nó vào mảng renderedSpecialties và render option mới
                                    renderedSpecialties.push(specialty);
                                    return (
                                      <option key={`${index}-${subIndex}`}>{specialty}</option>
                                    );
                                  }
                                })
                            );
                          })()}
                    </Form.Select>
                  </Form.Group>
                    <Form.Group as={Col} md={4} controlId="position">
                      <Form.Label>Vị trí</Form.Label>
                      <Form.Select
                        onChange={(event) => setPosition(event.target.value)}
                        defaultValue={treatment.position}
                      >
                        <option>{""}</option>
                        <option value={"Y tá"}>Y tá</option>
                        <option value={"Bác sĩ"}>Bác sĩ</option>
                        <option value={"Nhân viên hỗ trợ"}>
                          Nhân viên hỗ trợ
                        </option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md={4} controlId="medicalStaffID">
                      <Form.Label>Nhân viên y tế</Form.Label>
                      <Form.Select
                        disabled={!(dateBegin && dateEnd)}
                        onClick={handleDisplayMedStaff}
                        onChange={(event) => setMedStaffID(event.target.value)}
                        value={medStaffID}
                      >
                        <option value={""}>{""}</option>
                        {medStaffData &&
                          medStaffData.map((obj, index) => {
                            return (
                              <option key={index} value={obj.id}>
                                {" "}
                                {obj.lastMiddleName + " " + obj.firstName}{" "}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  {/* {medStaffID && 
                    <Row className='mb-3'>
                      <Row className="mb-3">
                        <Form.Group controlId="medstaff-title">
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
                        <Form.Group controlId="medstaff-description">
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
                  } */}
                  <Button type="submit">Đổi thông tin lịch trình</Button>
                  <Button
                    style={{ position: "absolute", right: "1vw" }}
                    onClick={() => handleDeleteTreatProcess(treatment.id)}
                    variant="danger"
                  >
                    Xoá tiến trình này
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TreatProcess;
