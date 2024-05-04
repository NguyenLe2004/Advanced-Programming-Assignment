import React from 'react'
import { faUserDoctor,faUserNurse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./StatComponent.css"
const StatComponent = () => {
  return (
    <div className='flex-container'>
      <div>
        <div><FontAwesomeIcon icon={faUserDoctor} /></div>
        <div style={{fontWeight:"bold"}}>100+</div>
        <div style={{fontSize:"24px",color:"gray"}}>Bác sĩ</div>
      </div>
      <div>
        <div><FontAwesomeIcon icon={faUserNurse} /></div>
        <div style={{fontWeight:"bold"}}>130+</div>
        <div style={{fontSize:"24px",color:"gray"}}>Y tá</div>
      </div>
      <div>
        <div><FontAwesomeIcon icon={faUserDoctor} /></div>
        <div style={{fontWeight:"bold"}}>120+</div>
        <div style={{fontSize:"24px",color:"gray"}}>Nhân viên hỗ trợ</div>
      </div>
      <div>
        <div><FontAwesomeIcon icon={faUserDoctor} /></div>
        <div style={{fontWeight:"bold"}}>150+</div>
        <div style={{fontSize:"24px",color:"gray"}}>Trang thiết bị</div>
      </div>


    </div>
  )
}

export default StatComponent
