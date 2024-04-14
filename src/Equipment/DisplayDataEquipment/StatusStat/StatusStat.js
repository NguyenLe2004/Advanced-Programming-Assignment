import React, { useState } from 'react'
import { Container,Row, Col, Button } from 'react-bootstrap'
import AddPatientForm from './AddPatientForm/AddPatientForm'
import moment from 'moment'
import "./StatusStat.css"

const StatusStat = ({treatProcess}) => {
    const [showAddPatientForm, setShowAddPatientForm] = useState(false);
    const handleClickAddBtn = () =>{
        setShowAddPatientForm(true);
    }
    const getPatientStatus = (treatProcess) => {
        const length = treatProcess.length;
        if (length === 0) {
            return "Chưa điều trị";
        }
        const currentDate = moment();
        const lastTreatDay = moment(treatProcess[length-1].dateEnd, 'DD/MM/YYYY');
        if (lastTreatDay < currentDate) {
            return "Hoàn thành điều trị";
        }
        return "Đang điều trị";
    }

    const frequencyCount = {
        "Chưa điều trị" : 0,
        "Hoàn thành điều trị" : 0,
        "Đang điều trị" :0
    };

    treatProcess.forEach((item) => {
        const status = getPatientStatus(item)
      if (frequencyCount[status]) {
        frequencyCount[status] += 1;
      } else {
        frequencyCount[status] = 1;
      }
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
                                {treatProcess.length}
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
