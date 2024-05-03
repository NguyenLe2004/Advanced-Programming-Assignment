import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, Container,Row, Col } from 'react-bootstrap';
import "./DisplayMoreInfo.css"
import axios from 'axios';

const DisplayMoreInfo = (props) => {
  const data = props.dataMoreInfo;
  if (!data ||data.citizenID ==='' || data.citizenID==null) return;
 
  return (
    <div> 
      <Offcanvas show={props.show} onHide={props.handleClose} placement='end' >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Thông tin bệnh nhân</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
        <Container>

        <Row className='detail-info-row'>
            <Col>
              <div className='detail-label'> Họ và Tên đệm</div>
              <div>{data.lastMiddleName} </div>
            </Col>
            <Col>
              <div className='detail-label'>Tên</div>
              <div> {data.firstName} </div>
            </Col>
          </Row>
          <Row className='detail-info-row'>
            <Col>
              <div className='detail-label'>CCCD</div>
              <div> {data.citizenID}</div>
            </Col>
            <Col>
              <div className='detail-label'>Nghề nghiệp</div>
              <div> {data.job}</div>
            </Col>
          </Row>
          
          <Row className='detail-info-row'>
            <Col>
              <div className='detail-label'>Quê quán</div>
              <div>{data.hometown}</div>
            </Col>
            <Col>
              <div className='detail-label'> Giới tính </div>
              <div>{data.gender}</div>
            </Col>
          </Row>
          <Row className='detail-info-row'>
            <Col>
              <div className='detail-label'> Email </div>
              <div> {data.email} </div>
            </Col>
          </Row>
          <Row className='detail-info-row'>
            <Col>
              <div className='detail-label'>Ngày tháng năm sinh</div>
              <div> {data.dateOfBirth} </div>
            </Col>
          </Row>
          <Row className='detail-info-row'>
            <Col>
              <div className='detail-label'>Trạng thái khám bệnh</div>
              <div>{data.status}</div>
            </Col>
          </Row>
          <Row>
            

            <div><Button href={`Patient/${data.id}`}> Thông tin chi tiết </Button></div>
          </Row>
        </Container>
        

        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default DisplayMoreInfo;