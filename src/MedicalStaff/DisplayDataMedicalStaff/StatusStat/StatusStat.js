import React, { useState } from 'react'
import { Container,Row, Col, Button } from 'react-bootstrap'
import AddMedicalStaffForm from './AddMedicalStaffForm/AddMedicalStaffForm'
import moment from 'moment'
import "./StatusStat.css"

const StatusStat = ({schedule,position}) => {
    const [showAddMedicalStaffForm, setShowAddMedicalStaffForm] = useState(false);
    const handleClickAddBtn = () =>{
        setShowAddMedicalStaffForm(true);
    }
    const getMedicalStaffStatus = (schedule) => {
        const curDate = moment(moment().format("DD-MM-YYYY"),"DD-MM-YYYY");
        const curTime = moment(moment().format("HH-mm"),"HH:mm");
        let status="Sẵn sàng";
        schedule.forEach(obj => {
          const date = moment(obj.date,"DD-MM-YYYY");
          if(date < curDate) return ;
          if(obj.description ==="Nghỉ phép"){
            status = "Nghỉ phép";
            return;
          }
          if(date.isSame(curDate) && moment(obj.timeBegin,"HH:mm").isSameOrBefore(curTime) && moment(obj.timeEnd,"HH:mm").isSameOrAfter(curTime)) {
            status = "Đang làm việc";
            return;
          }
        });
        return status;
      }

    const frequencyCount = {
        "Sẵn sàng" : 0,
        "Đang làm việc" : 0,
        "Nghỉ phép" :0,
    };

    schedule.forEach((item) => {
        const status = getMedicalStaffStatus(item)
        frequencyCount[status] ++;
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
                                {schedule.length}
                            </div>
                            <div>Bệnh nhân</div>
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
