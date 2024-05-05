import React, { useState } from 'react'
import { Container,Row, Col, Button } from 'react-bootstrap'
import AddEquipmentForm from './AddEquipmentForm/AddEquipmentForm'
import moment from 'moment'
import "./StatusStat.css"

const StatusStat = ({dataEquipment, role}) => {
    const [showAddEquipmentForm, setShowAddEquipmentForm] = useState(false);
    const handleClickAddBtn = () =>{
        setShowAddEquipmentForm(true);
    }
    const frequencyCount = {
        "Đang sử dụng" : 0,
        "Sẵn sàng" : 0,
        "Đang bảo trì" :0
    };

    dataEquipment.forEach((item) => {
        frequencyCount[item.status]++;
    });
  return (
        <div>
            {showAddEquipmentForm && 
                <div>   
                    <div className='background'> </div>
                    <AddEquipmentForm setShowAddEquipmentForm={setShowAddEquipmentForm} />
                </div>
            }
            <div className='stat-block'>
                <Container>
                    <Row>
                        <Col className='stat-col'>
                            <div className='stat-total total'>
                                {dataEquipment.length}
                            </div>
                            <div>Thiết bị</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='stat-total done'>
                                {frequencyCount["Sẵn sàng"]}
                            </div>
                            <div>Sẵn sàng</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='stat-total on-going'>
                                {frequencyCount["Đang sử dụng"]}
                            </div>
                            <div>Đang sử dụng</div>
                        </Col>               
                        <Col className='stat-col'>
                            <div className='stat-total none'>
                                {frequencyCount["Đang bảo trì"]}
                            </div>
                            <div>Đang bảo trì</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='more-stat-btn'><Button disabled = {role !== "admin"} onClick={handleClickAddBtn}  > Thêm Thiết bị</Button></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>


  )
}

export default StatusStat
