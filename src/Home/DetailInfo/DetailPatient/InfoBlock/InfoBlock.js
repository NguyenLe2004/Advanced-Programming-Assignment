import React, { useState } from 'react'
import { Container, Col,Row } from 'react-bootstrap'
import "./InfoBlock.css"

const InfoBlock = ({patient}) => {



  return (
    <div>
        <Container>
          <Row>
            <div 
            className={
              `all-status status-${patient.status === "Đang điều trị" ? "on-going" : 
              patient.status === "Chưa điều trị" ? "not" : "complete"
              }`}> 
            {patient.status}
            </div>
          </Row>
          <div className='disp-info'> 
          <Row   > 
            <Col className='patient-info patient-label'>
              <span>Họ và tên </span>
            </Col>
            <Col className='patient-info patient-value' xs={7}>
              <span >{patient.lastMiddleName + " " + patient.firstName}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='patient-info patient-label'>
              <span>Giới tính </span>
            </Col>
            <Col className='patient-info patient-value' xs={7}>
              <span >{patient.gender}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='patient-info patient-label'>
              <span>Nghề nghiệp </span>
            </Col>
            <Col className='patient-info patient-value' xs={7}>
              <span >{patient.job}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='patient-info patient-label'>
              <span>Ngày sinh </span>
            </Col>
            <Col className='patient-info patient-value' xs={7}>
              <span >{patient.dateOfBirth}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='patient-info patient-label'>
              <span>Căn cước công dân </span>
            </Col>
            <Col className='patient-info patient-value' xs={7}>
              <span >{patient.citizenID}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='patient-info patient-label'>
              <span>Email </span>
            </Col>
            <Col className='patient-info patient-value' xs={7}>
              <span >{patient.email}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='patient-info patient-label'>
              <span>Địa chỉ </span>
            </Col>
            <Col className='patient-info patient-value' xs={7}>
              <span >{patient.address}</span>
            </Col>
          </Row>
          <Row  > 
            <Col className='patient-info patient-label'>
              <span>Quê quán </span>
            </Col>
            <Col className='patient-info patient-value' xs={7}>
              <span >{patient.hometown}</span>
            </Col>
          </Row>
          </div>
        </Container>
    </div>
  )
}

export default InfoBlock;