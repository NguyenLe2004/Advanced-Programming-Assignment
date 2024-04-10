import React, { useState } from 'react'
import "./MedInfoBlock.css"
import { Container,Row, Col, Button } from 'react-bootstrap'
const MedInfoBlock = ({patient}) => {
    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }
  return (
    <div>
        <div className='med-info-block' >
        <h3 className='title-med-info'>Thông tin y tế</h3>
        <Container >
            <Row className='mb-3'>
                <Col md='4'>
                    Chiều cao:
                </Col>
                <Col>
                    {patient.height}
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col md='4'>
                    Cân nặng:
                </Col>
                <Col>
                    {patient.weight}
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col md='4'>
                    Nhóm máu: 
                </Col>
                <Col>
                    {patient.bloodType}
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col md='4'>
                    Lịch sử bệnh án: 
                </Col>
                <Col>
                    {patient.medHistory}
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col md='4'>
                    Triệu chứng bệnh: 
                </Col>
                <Col>
                    {patient.symptoms}
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col md='4'>
                    Chẩn đoán của bác sĩ: 
                </Col>
                <Col>
                    {patient.diagnosis}
                </Col>
            </Row>
        </Container>
        <Button style={{marginLeft:"50%",transform:"translateX(-50%)"}} onClick={handleScroll}>Xem tiến trình điều trị</Button>
    </div>
    </div>
  )
}

export default MedInfoBlock
