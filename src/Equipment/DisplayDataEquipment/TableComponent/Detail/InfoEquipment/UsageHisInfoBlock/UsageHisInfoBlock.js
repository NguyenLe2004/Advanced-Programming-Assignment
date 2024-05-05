import React, { useState } from 'react'
import { faPenToSquare, faXmark,faAnglesLeft,faAnglesRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import moment from 'moment'
import "./UsageHisInfoBlock.css"
import { Row, Col, Button,Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
const UsageHisInfoBlock = ({equipmentData}) => {
    const [isUpdate, setIsUpdate] = useState(false)
    const [isAdd, setIsAdd] = useState(false);
    const [validated, setValidated] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error,setError] = useState("")
    const usageHistory = equipmentData.usageHistory;
    const totalPage = usageHistory.length;
    const handleDelete = () =>{
        axios.delete("http://localhost:8080/v1/equipments/"+ equipmentData.id+"/usageHistory/"+usageHistory[currentPage-1].id)
        .then(() => window.location.reload()) 
        .catch((error) => console.error(error))
    }
    const handleSubmit =  (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } 

      else{
        const [dateBegin, timeBegin] = form.elements.datetimeBegin.value.split("T")
        const [dateEnd, timeEnd] = form.elements.datetimeEnd.value.split("T")
        const data = {
            room: form.elements.room.value,
            dateBegin : moment(dateBegin,"YYYY-MM-DD").format("DD-MM-YYYY"),
            dateEnd :  moment(dateBegin,"YYYY-MM-DD").format("DD-MM-YYYY"),
            timeBegin:timeBegin,
            timeEnd : timeEnd
        }
        if (isUpdate) {
            axios.put("http://localhost:8080/v1/equipments/" + equipmentData.id+"/usageHistory/"+usageHistory[currentPage-1].id,data)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            })

        } else {

            axios.post("http://localhost:8080/v1/equipments/" + equipmentData.id+"/usageHistory/",data)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            })
        }


      } 
      setValidated(true);
    };
  return (
    <div>
        <div className='usageHistory-info-block' >
        <div className='pen-to-square-icon-med' ><FontAwesomeIcon icon={faPenToSquare} style={{position:"relative"}} onClick={() => setIsUpdate((prevState) => !prevState)} /></div>
        <h3 className='title-med-info'>Lịch sử sử dụng</h3>
        {(!isUpdate && !isAdd)? (
            <div>
                {usageHistory &&
                    <div style={{textAlign:"center"}}>
                    <Row className='mt-3 mb-3'>
                        <h4>{usageHistory[currentPage-1].room}</h4>
                    </Row>
                    <Row className='mt-3 mb-3'>
                        <div style={{color:"gray"}}>
                            Từ {usageHistory[currentPage-1].dateBegin.split("-").join("/")+ " " + usageHistory[currentPage-1].timeBegin}
                            {" "}đến {usageHistory[currentPage-1].dateEnd.split("-").join("/")+ " " + usageHistory[currentPage-1].timeEnd}
                        </div>
                    </Row>
                    <Button variant='outline-danger' disabled={usageHistory.length <= 1} onClick={handleDelete} style={{position:"absolute",right:"1vw",top:"10vh"}} ><FontAwesomeIcon icon={faXmark} /></Button>
                    <Button variant='outline-primary' onClick={()=>setIsAdd(true)} style={{position:"absolute",left:"1vw",top:"10vh"}} ><FontAwesomeIcon icon={faPlus} /></Button>
                    </div>
                }
                <div style={{textAlign:"center"}}>
                    <span>
                        <Button style={{width:"5vw"}} disabled={currentPage<=1} onClick={() => setCurrentPage(currentPage-1)}>
                            <FontAwesomeIcon icon={faAnglesLeft} />
                        </Button>
                    </span>
                    <span style={{color:"gray",margin:"0 1vw"}}>
                        {currentPage} / {totalPage}
                    </span>
                    <span>
                        <Button style={{width:"5vw"}} disabled={currentPage>=totalPage} onClick={() => setCurrentPage(currentPage+1)} >
                        <FontAwesomeIcon icon={faAnglesRight} />
                        </Button>
                    </span>
                </div>
             </div>
        ):(
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
                <Row className="mb-3">
                {error && (
                <div>
                  <style>
                    {`
                          .alert-danger {
                          font-size: 15px; /* Điều chỉnh kích thước phù hợp */
                          padding: 10px 15px;
                            }
                          `}
                  </style>
                  <div class="alert alert-danger" role="alert">
                    {error}
                  </div>
                </div>
              )}
                    <Form.Group  controlId="room">
                    <Form.Label>Phòng</Form.Label>
                    <Form.Control type='text' placeholder="Phòng" required defaultValue={isAdd? "": usageHistory[currentPage-1].room}  />
                    <Form.Control.Feedback type="invalid">
                    Thông tin không hợp lệ
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="datetimeBegin">
                    <Form.Label>Thời điểm bắt đầu</Form.Label>
                    <Form.Control type="datetime-local"  defaultValue={isAdd ? "":moment(usageHistory[currentPage-1].dateBegin,"DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")} required />
                    <Form.Control.Feedback type="invalid">
                    Thời điểm không hợp lệ
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="datetimeEnd">
                    <Form.Label>Thời điểm kết thúc</Form.Label>
                    <Form.Control type="datetime-local" defaultValue={isAdd ? "":moment(usageHistory[currentPage-1].dateEnd,"DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm")} required />
                    <Form.Control.Feedback type="invalid">
                    Thời điểm không hợp lệ
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit" style={{marginLeft:"50%",transform:"translateX(-50%)"}}>{isAdd? "Thêm" : "Cập nhập" }</Button>
                <Button style={{position:"absolute",right:"1vw"}} variant='danger' onClick={() => {
                    setIsAdd(false);
                    setIsUpdate(false);
                    setError(false);
                    setValidated(false);
                }}>Huỷ</Button>
                </Form>
        )}
    </div>
    </div>
  )
}

export default UsageHisInfoBlock

