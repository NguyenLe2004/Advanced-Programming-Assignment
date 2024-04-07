import button from "../../../../src/img/button.png"
import button1 from "../../../../src/img/button1.png"
import button2 from "../../../../src/img/button2.png"
import button3 from "../../../../src/img/button3.png"
import './Button.css'
import React from 'react'

export default function Button() {
  return (
    
      <div class="control-button"> 
   <div class="persona-button-container container"> 
   <a href="http://www.sgh.com.sg/patient-care">
      <div class="rowAndCol" > 
          <img class="icon" src={button} alt=""/>
            <div class="box-item"> 
            <h3 class="title">Bệnh nhân</h3> 
            <span class="content"> Danh sách bệnh nhân và lộ trình điều trị.</span> </div> 
      </div>  </a>
      <a href="http://www.sgh.com.sg/careers" >
      <div class="rowAndCol" > 
         <img class="icon" src={button1} alt=""/>  
         <div class="box-item" > 
            <h3 class="title">Đội ngũ bác sĩ</h3> 
            <span class="content"> Nơi đây hội tụ những bác sĩ tận tâm, trách nhiệm</span> </div> 
      </div> </a>
      <a href="http://www.sgh.com.sg/phico">
         <div class="rowAndCol" > 
         <img class="icon" src={button2} alt=""/>  
            <h3 class="title">Điều dưỡng</h3> 
            <span class="content"> Người chăm sóc tuyệt vời của BKHeathCare</span> 
      </div>
      </a>  
      <a href="http://www.sgh.com.sg/phico">
         <div class="rowAndCol" > 
         <img class="icon" src={button2} alt=""/>  
            <h3 class="title">Nhân viên</h3> 
            <span class="content"> Nhân viên hỗ trợ nhiệt tình, năng động</span> 
      </div>
      </a>  
      <a href="http://www.sgh.com.sg/phico">
         <div class="rowAndCol" > 
         <img class="icon" src={button2} alt=""/>  
            <h3 class="title">Thuốc</h3> 
            <span class="content"> Nơi quản lí danh sách thuốc của BKHeathCare</span> 
      </div>
      </a>  
      <a href="http://www.sgh.com.sg/phico">
         <div class="rowAndCol" > 
         <img class="icon" src={button3} alt=""/>  
            <h3 class="title">Trang thiết bị </h3> 
            <span class="content"> Nơi quản lí trang thiết bị hiện đại của BKHeathCare</span> 
      </div>
      </a> 
      
   </div> 
</div>
      
  )
}
