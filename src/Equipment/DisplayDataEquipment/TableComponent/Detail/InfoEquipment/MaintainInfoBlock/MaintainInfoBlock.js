import React, { useState } from 'react'
import { faPenToSquare, faXmark,faAnglesLeft,faAnglesRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import moment from 'moment'
import "./MaintainInfoBlock.css"
import { Row, Col, Button,Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
const MaintainInfoBlock = ({equipmentData}) => {
    const [isUpdate, setIsUpdate] = useState(false)
    const [isAdd, setIsAdd] = useState(false);
    const [validated, setValidated] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error,setError] = useState("")
    const {id} = useParams();
    const regularMaintenance = equipmentData.regularMaintenance;
    const totalPage = regularMaintenance.length;
    const handleDelete = () =>{
        let newMaintain = [...regularMaintenance];
        newMaintain.splice(currentPage-1,1);
        axios.put("http://localhost:8080/v1/equipments/" + equipmentData.id,{
            name : equipmentData.name,
            regularMaintenance : newMaintain
        })
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
          let updateData = [...regularMaintenance]
        let data = {
                description: form.elements.description.value,
                dateBegin : moment(form.elements.dateBegin.value,"YYYY-MM-DD").format("DD-MM-YYYY"),
                dateEnd : moment(form.elements.dateEnd.value,"YYYY-MM-DD").format("DD-MM-YYYY")
            } 
        if (isUpdate) {
            updateData[currentPage-1] = data
        } else {
            updateData.push(data)
        }
            axios.put("http://localhost:8080/v1/equipments/" + equipmentData.id,{
                name : equipmentData.name,
                regularMaintenance : updateData
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            })

      } 
      setValidated(true);
    };
  return (
    <div>
        <div className='regularMaintenance-info-block' >
        <div className='pen-to-square-icon-med' ><FontAwesomeIcon icon={faPenToSquare} style={{position:"relative"}} onClick={() => setIsUpdate((prevState) => !prevState)} /></div>
        <h3 className='title-med-info'>Thông tin bảo dưỡng</h3>
        {(!isUpdate && !isAdd)? (
            <div>
                {regularMaintenance &&
                    <div style={{textAlign:"center"}}>
                    <Row className='mt-3 mb-3'>
                        <h4>{regularMaintenance[currentPage-1].description}</h4>
                    </Row>
                    <Row className='mt-3 mb-3'>
                        <div style={{color:"gray"}}>{regularMaintenance[currentPage-1].dateBegin.split('-').join("/ ")} - {regularMaintenance[currentPage-1].dateEnd.split('-').join("/ ")} </div>
                    </Row> 
                    <Button variant='outline-danger' disabled={regularMaintenance.length <= 1} onClick={handleDelete} style={{position:"absolute",right:"1vw",top:"10vh"}} ><FontAwesomeIcon icon={faXmark} /></Button>
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
                    <Form.Group  controlId="description">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control type='text' placeholder="Mô tả" required defaultValue={isAdd? "": regularMaintenance[currentPage-1].description}  />
                    <Form.Control.Feedback type="invalid">
                    Thông tin không hợp lệ
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="5" controlId="dateBegin">
                    <Form.Label>Ngày bắt đầu</Form.Label>
                    <Form.Control type="date" placeholder="Ngày cấp" defaultValue={isAdd ? "":moment(regularMaintenance[currentPage-1].dateBegin,"DD-MM-YYYY").format("YYYY-MM-DD")} required />
                    <Form.Control.Feedback type="invalid">
                    Thời điểm không hợp lệ
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="5" controlId="dateEnd">
                    <Form.Label>Ngày kết thúc</Form.Label>
                    <Form.Control type="date" placeholder="Ngày cấp" defaultValue={isAdd ? "":moment(regularMaintenance[currentPage-1].dateEnd,"DD-MM-YYYY").format("YYYY-MM-DD")} required />
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

export default MaintainInfoBlock

