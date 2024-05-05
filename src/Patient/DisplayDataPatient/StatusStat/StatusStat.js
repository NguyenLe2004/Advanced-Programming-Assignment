import React, { useState } from 'react'
import { Container,Row, Col, Button } from 'react-bootstrap'
import AddPatientForm from './AddPatientForm/AddPatientForm'
import moment from 'moment'
import "./StatusStat.css"

const StatusStat = ({dataPatient}) => {
    const [showAddPatientForm, setShowAddPatientForm] = useState(false);
    const handleClickAddBtn = () =>{
        setShowAddPatientForm(true);
    }

    const frequencyCount = {
        "Chưa điều trị" : 0,
        "Hoàn thành điều trị" : 0,
        "Đang điều trị" :0
    };

    dataPatient.forEach((obj) => {
        frequencyCount[obj.status] += 1;
    });
  return (
        <div>
            {showAddPatientForm && 
                <div>   
                    <div className='background'> </div>
                    <AddPatientForm setShowAddPatientForm={setShowAddPatientForm} />
                </div>
            }
            <div className='stat-block'>
                <Container>
                    <Row>
                        <Col className='stat-col'>
                            <div className='stat-total total'>
                                {dataPatient.length}
                            </div>
                            <div>Bệnh nhân</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='stat-total done'>
                                {frequencyCount["Hoàn thành điều trị"]}
                            </div>
                            <div>Hoàn thành điều trị</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='stat-total on-going'>
                                {frequencyCount["Đang điều trị"]}
                            </div>
                            <div>Đang điều trị</div>
                        </Col>               
                        <Col className='stat-col'>
                            <div className='stat-total none'>
                                {frequencyCount["Chưa điều trị"]}
                            </div>
                            <div>Chưa điều trị</div>
                        </Col>

                        <Col className='stat-col'>
                            <div className='more-stat-btn'><Button onClick={handleClickAddBtn}  > Thêm bệnh nhân</Button></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>


  )
}

export default StatusStat