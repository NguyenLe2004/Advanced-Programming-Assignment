import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./InfoMedicine.css"
const InfoMedicine = ({medicineData,setIsUpdate}) => {
    const getMedicineStatusClass = (status) => {
        switch (status) {
          case "Hết thuốc" : 
            return "treating";
          case "Sẵn sàng" :
            return "complete-treat";
          default :
            return "no-treat"
        }
      }    
  return (
    <div>
        <span style={{display:"flex"}}>
            <h2 style={{display:"flex",fontWeight:"bold"}}> 
                {medicineData.name}
                <p className='update-medicine-icon' ><FontAwesomeIcon icon={faPen} onClick={() => setIsUpdate(true)} /></p>
            </h2>
        </span>

        <Container>
        <Row className='mb-3'>
            <h4 className={`status-popup ${getMedicineStatusClass(medicineData.status)}`}> {medicineData.status} </h4>
        </Row>
        <Row className='container-info'>
            <Col className='col-detail-medicine label-detail-medicine'>
                <Row className='mb-3'>Số lượng: </Row>
                <Row className='mb-3'>Hạn sử dụng: </Row>
                <Row className='mb-3'> Ngày nhập kho: </Row>
                <Row className='mb-3'>Ngày xuất kho: </Row>

            </Col>
            <Col className='col-detail-medicine'>
                <Row className='mb-3'>{medicineData.amount}  </Row>
                <Row className='mb-3'>{medicineData.expireDate.split("-").join( "/")}  </Row>
                <Row className='mb-3'>{medicineData.arrivalDate.split("-").join( "/")} {medicineData.arrivalTime}   </Row>
                <Row className='mb-3'>{medicineData.departureDate.split("-").join( "/")} {medicineData.departureTime}  </Row>
            </Col>
        </Row>

        </Container>


    </div>
  )
}

export default InfoMedicine
