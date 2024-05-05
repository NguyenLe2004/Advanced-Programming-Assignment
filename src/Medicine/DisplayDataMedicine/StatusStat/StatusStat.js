import React, { useState } from 'react'
import { Container,Row, Col, Button } from 'react-bootstrap'
import AddMedicineForm from './AddMedicineForm/AddMedicineForm'
import moment from 'moment'
import "./StatusStat.css"

const StatusStat = ({dataMedicine, role}) => {
    const [showAddMedicineForm, setShowAddMedicineForm] = useState(false);
    const handleClickAddBtn = () =>{
        setShowAddMedicineForm(true);
    }
    const frequencyCount = {
        "Hết thuốc" : 0,
        "Hết hạn" : 0,
        "Sẵn sàng" :0
    };

    dataMedicine.forEach((item) => {
        frequencyCount[item.status] += 1;
    });
  return (
        <div>
            {showAddMedicineForm && 
                <div>   
                    <div className='background'> </div>
                    <AddMedicineForm setShowAddMedicineForm={setShowAddMedicineForm} />
                </div>
            }
            <div className='stat-block'>
                <Container>
                    <Row>
                        <Col className='stat-col'>
                            <div className='stat-total total'>
                                {dataMedicine.length}
                            </div>
                            <div>Thuốc</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='stat-total done'>
                                {frequencyCount["Sẵn sàng"]}
                            </div>
                            <div>Sẵn sàng</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='stat-total on-going'>
                                {frequencyCount["Hết thuốc"]}
                            </div>
                            <div>Hết thuốc</div>
                        </Col>               
                        <Col className='stat-col'>
                            <div className='stat-total none'>
                                {frequencyCount["Hết hạn"]}
                            </div>
                            <div>Hết hạn</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='more-stat-btn'><Button disabled = {role !== "admin"} onClick={handleClickAddBtn}  > Thêm Thuốc</Button></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>


  )
}

export default StatusStat
