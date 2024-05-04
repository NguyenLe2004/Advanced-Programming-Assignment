import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./InfoEquipment.css"
const InfoEquipment = ({equipmentData,setIsUpdate}) => {
    const getEquipmentStatusClass = (status) => {
        switch (status) {
          case "Bảo trì" : 
            return "treating";
          case "Sẵn sàng" :
            return "complete-treat";
          default :
            return "no-treat"
        }
      }    
  return (
    <div>
        <span style={{display:"flex"}}>
            <h2 style={{display:"flex",fontWeight:"bold"}}> 
                {equipmentData.name}
                <p className='update-equipment-icon' ><FontAwesomeIcon icon={faPen} onClick={() => setIsUpdate(true)} /></p>
            </h2>
        </span>

        <Container>
        <Row className='mb-3'>
            <h4 className={`status-popup ${getEquipmentStatusClass(equipmentData.status)}`}> {equipmentData.status} </h4>
        </Row>
        </Container>


    </div>
  )
}

export default InfoEquipment