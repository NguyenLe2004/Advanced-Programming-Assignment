import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Footer = () => {
  return (
    <footer className='footer'> 
        <Container >
        <Row>
            <Col>
                <div> 
                BK Health Care
                </div>
                <p> dafdfdfsf </p>
            </Col>
            <Col xs ={5}> Thành viên nhóm</Col>
            <Col>Help Center</Col>
        </Row>
        </Container>
    </footer>

  )
}

export default Footer;