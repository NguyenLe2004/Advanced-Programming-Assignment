import React from 'react'
import { Container, Col,Row } from 'react-bootstrap'
import "./InfoBlock.css"

const InfoBlock = ({medicalStaff}) => {



  return (
    <div>
        <Container>
          <Row>
            <div 
            className={
              `all-status status-${medicalStaff.status === "Đang làm việc" ? "on-going" : 
              medicalStaff.status === "Nghỉ phép" ? "not" : "complete"
              }`}> 
            {medicalStaff.status}
            </div>
          </Row>
          <div className='disp-info'> 
          <Row   > 
            <Col className='medicalStaff-info medicalStaff-label'>
              <span>Họ và tên </span>
            </Col>
            <Col className='medicalStaff-info medicalStaff-value' xs={7}>
              <span >{medicalStaff.lastMiddleName + " " + medicalStaff.firstName}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='medicalStaff-info medicalStaff-label'>
              <span>Giới tính </span>
            </Col>
            <Col className='medicalStaff-info medicalStaff-value' xs={7}>
              <span >{medicalStaff.gender}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='medicalStaff-info medicalStaff-label'>
              <span>Ngày sinh </span>
            </Col>
            <Col className='medicalStaff-info medicalStaff-value' xs={7}>
              <span >{medicalStaff.dateOfBirth}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='medicalStaff-info medicalStaff-label'>
              <span>Căn cước công dân </span>
            </Col>
            <Col className='medicalStaff-info medicalStaff-value' xs={7}>
              <span >{medicalStaff.citizenID}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='medicalStaff-info medicalStaff-label'>
              <span>Email </span>
            </Col>
            <Col className='medicalStaff-info medicalStaff-value' xs={7}>
              <span >{medicalStaff.email}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='medicalStaff-info medicalStaff-label'>
              <span>Địa chỉ </span>
            </Col>
            <Col className='medicalStaff-info medicalStaff-value' xs={7}>
              <span >{medicalStaff.address}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='medicalStaff-info medicalStaff-label'>
              <span>Quê quán </span>
            </Col>
            <Col className='medicalStaff-info medicalStaff-value' xs={7}>
              <span >{medicalStaff.hometown}</span>
            </Col>
          </Row>
          </div>
        </Container>
    </div>
  )
}

export default InfoBlock;