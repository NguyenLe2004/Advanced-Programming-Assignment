import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import UsageHisInfoBlock from './UsageHisInfoBlock/UsageHisInfoBlock';
import MaintainInfoBlock from './MaintainInfoBlock/MaintainInfoBlock';
import "./InfoEquipment.css"
const InfoEquipment = ({equipmentData,setIsUpdate}) => {
 
  return (
    <div>


        <Container>

        <UsageHisInfoBlock equipmentData={equipmentData} />
        <MaintainInfoBlock equipmentData={equipmentData} />
        </Container>


    </div>
  )
}

export default InfoEquipment