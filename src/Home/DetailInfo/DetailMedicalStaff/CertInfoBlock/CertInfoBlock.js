import React, { useState } from 'react'
import { faPenToSquare, faXmark,faAnglesLeft,faAnglesRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import moment from 'moment'
import "./CertInfoBlock.css"
import { Row, Col, Button,Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
const CertInfoBlock = ({medicalStaff}) => {
    const [isUpdate, setIsUpdate] = useState(false)
    const [isAdd, setIsAdd] = useState(false);
    const [validated, setValidated] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error,setError] = useState("")
    const {id} = useParams();
    const cert = medicalStaff.cert;
    if (!cert) return;
    const totalPage = cert.length;
    const handleDelete = () =>{
        let newCerts = [...cert];
        newCerts.splice(currentPage-1,1);
        const updateData = {
            ...medicalStaff,
            cert : newCerts 
        }
        axios.put("http://localhost:8080/v1/specialists/"+ id,updateData)
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
        const date = moment(form.elements.date.value)
        const curDay = moment()
          if(curDay.isBefore(date)){
            setError("thời điểm không hợp lệ")
            return;
          }
        let updateData = [...medicalStaff.cert];
        if (isUpdate) {
            updateData[currentPage-1] = {
                date: form.elements.date.value,
                organization : form.elements.organization.value,
                title : form.elements.title.value
            }
        } else {
            updateData.push({
                date: form.elements.date.value,
                organization : form.elements.organization.value,
                title : form.elements.title.value
            })
        }
            axios.put("http://localhost:8080/v1/specialists/" + id,{
                ...medicalStaff,
                cert : updateData
            })
            .then((response) => {
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
        <div className='cert-info-block' >
        <div className='pen-to-square-icon-med' ><FontAwesomeIcon icon={faPenToSquare} style={{position:"relative"}} onClick={() => setIsUpdate((prevState) => !prevState)} /></div>
        <h3 className='title-med-info'>Thông tin Chứng chỉ</h3>
        {(!isUpdate && !isAdd)? (
            <div>
                {cert &&
                    <div style={{textAlign:"center"}}>
                    <Row className='mt-3 mb-3'>
                        <h4>{cert[currentPage-1].title}</h4>
                    </Row>
                    <Row className='mt-3 mb-3'>
                        <div>{cert[currentPage-1].organization}</div>
                    </Row>
                    <Row className='mt-3 mb-3'>
                        <div style={{color:"gray"}}>{cert[currentPage-1].date}</div>
                    </Row>
                    <Button variant='outline-danger' disabled={cert.length <= 1} onClick={handleDelete} style={{position:"absolute",right:"1vw",top:"10vh"}} ><FontAwesomeIcon icon={faXmark} /></Button>
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
                    <Form.Group  controlId="title">
                    <Form.Label>Tên chứng chỉ</Form.Label>
                    <Form.Control type='text' placeholder="Tên chứng chỉ" required defaultValue={isAdd? "": cert[currentPage-1].title}  />
                    <Form.Control.Feedback type="invalid">
                    Thông tin không hợp lệ
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="8" controlId="organization">
                    <Form.Label>tổ chức</Form.Label>
                    <Form.Control type="text" placeholder="tổ chức" defaultValue={isAdd? "":cert[currentPage-1].organization} required />
                    <Form.Control.Feedback type="invalid">
                    Thông tin không hợp lệ
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="date">
                    <Form.Label>Ngày cấp</Form.Label>
                    <Form.Control type="date" placeholder="Ngày cấp" defaultValue={isAdd ? "":moment(cert[currentPage-1].date,"DD-MM-YYYY").format("YYYY-MM-DD")} required />
                    <Form.Control.Feedback type="invalid">
                    Thông tin không hợp lệ
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

export default CertInfoBlock

