import React from 'react'
import "./ButtonGroup.css"
import { faUser, faUserDoctor, faUserNurse, faHeadset, faPills,faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ButtonGroup = () => {
  return (
    <div className='btn-group'  style={{width:"100vw",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div>
      <a href='/patient'>
        <FontAwesomeIcon icon={faUser} />
        <span>Danh sách </span>
        <span>bệnh nhân</span>
        </a>
      </div>
      <div>
      <a href='/medicalStaff/specialist'>
      <FontAwesomeIcon icon={faUserDoctor} />
        <span>Danh sách </span>
        <span>bác sĩ</span>
        </a>
      </div>
      
      <div>
      <a href='/medicalStaff/nurse'>
      <FontAwesomeIcon icon={faUserNurse} />
      <span>Danh sách </span>
      <span>Y tá</span>
      </a>
      </div>
      <div>
      <a href='/medicalStaff/support'>
      <FontAwesomeIcon icon={faHeadset} />
      <span>Danh sách </span>
      <span>Nhân viên hỗ trợ</span>
      </a>
      </div>
      <div>
      <a href='/medicine'>
      <FontAwesomeIcon icon={faPills} />
      <span>Danh sách </span>
      <span>Thuốc</span>
      </a>
      </div>
      <div>
      <a href='/equipment'>
      <FontAwesomeIcon icon={faScrewdriverWrench} />
      <span>Danh sách </span>
      <span>Trang thiết bị</span>
      </a>
      </div>
    </div>
  )
}

export default ButtonGroup
