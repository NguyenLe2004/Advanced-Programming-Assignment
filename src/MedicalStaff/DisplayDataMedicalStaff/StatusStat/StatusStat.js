import React, { useState } from 'react'
import { Container,Row, Col, Button } from 'react-bootstrap'
import AddMedicalStaffForm from './AddMedicalStaffForm/AddMedicalStaffForm'
import moment from 'moment'
import "./StatusStat.css"

const StatusStat = ({dataMedicalStaff,position}) => {
    const [showAddMedicalStaffForm, setShowAddMedicalStaffForm] = useState(false);
    const handleClickAddBtn = () =>{
        setShowAddMedicalStaffForm(true);
    }

    const frequencyCount = {
        "Sẵn sàng" : 0,
        "Đang làm việc" : 0,
        "Nghỉ phép" :0,
    };

    dataMedicalStaff.forEach((obj) => {
        frequencyCount[obj.status] ++;
    });
  return (
        <div>
            {showAddMedicalStaffForm && 
                <div>   
                    <div className='background'> </div>
                    <AddMedicalStaffForm setShowAddMedicalStaffForm={setShowAddMedicalStaffForm} />
                </div>
            }
            <div className='stat-block'>
                <Container>
                    <Row>
                        <Col className='stat-col'>
                            <div className='stat-total total'>
                                {dataMedicalStaff.length}
                            </div>
                            <div>{position==="specialist" ? "Bác sĩ" : position==="nurse" ? "Y tá" : "Nhân viên hỗ trợ" }</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='stat-total done'>
                                {frequencyCount["Sẵn sàng"]}
                            </div>
                            <div>Sẵn sàng</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='stat-total on-going'>
                                {frequencyCount["Đang làm việc"]}
                            </div>
                            <div>Đang làm việc</div>
                        </Col>               
                        <Col className='stat-col'>
                            <div className='stat-total none'>
                                {frequencyCount["Nghỉ phép"]}
                            </div>
                            <div>Nghỉ phép</div>
                        </Col>
                        <Col className='stat-col'>
                            <div className='more-stat-btn'><Button onClick={handleClickAddBtn}  > 
                            Thêm {position==="specialist" ? "bác sĩ" : position ==="nurse" ? "y tá" : "nhân viên hỗ trợ"}
                            </Button></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>


  )
}

export default StatusStat
