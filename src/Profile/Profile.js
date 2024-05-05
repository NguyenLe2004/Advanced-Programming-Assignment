import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import "./Profile.css"
const Profile = (user) => {
    return (
        <>
            <div style={{ height: "5vh" }}>
            </div>

            <div className='main-page-detail'>
                <div className='info-block2'>
                    <span className='info2'> 
                        <div className='avatar' >{user.name}</div>
                        <div>
                            <Container>
                                <div className='disp-info'>
                                    <Row>
                                        <Col className='patient-info patient-label'>
                                            <span>Họ và tên </span>
                                        </Col>
                                        <Col className='patient-info patient-value' xs={7}>
                                            <span >{user.name}</span>
                                        </Col>
                                    </Row>
                                    <Row  >
                                        <Col className='patient-info patient-label'>
                                            <span>Email </span>
                                        </Col>
                                        <Col className='patient-info patient-value' xs={7}>
                                            <span >{user.email}</span>
                                        </Col>
                                    </Row>
                                    <Row  >
                                        <Col className='patient-info patient-label'>
                                            <span>ID người dùng </span>
                                        </Col>
                                        <Col className='patient-info patient-value' xs={7}>
                                            <span >{user.id}</span>
                                        </Col>
                                    </Row>
                                    <Row  >
                                        <Col className='patient-info patient-label'>
                                            <span>Role</span>
                                        </Col>
                                        <Col className='patient-info patient-value' xs={7}>
                                            <span >{user.role}</span>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </div>
                    </span>
                </div>
            </div>
        </>

    )
}

export default Profile