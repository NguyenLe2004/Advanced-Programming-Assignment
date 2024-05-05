import React, {useState} from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ava_1 from  "../../../../Image/ava_1.jpeg"
import ava_2 from  "../../../../Image/ava_2.jpeg"
import ava_3 from  "../../../../Image/ava_3.png"


import "./Review.css"
const Review = () => {
    
  return (
    <div className='outer-review'>
      <div className='review-block'>
        <div className='avg-header'>  
          <FontAwesomeIcon style={{color:"rgb(220, 220, 0)",fontSize:"35px"}} icon={faStar} />  
          <span style={{fontWeight:"bold",fontSize:"30px"}}>4.9</span>
          <span style={{color:'gray',fontSize:"15px",position:"relative",top:"1vh",left:"5px"}}>1000+ review</span>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1vh 0"}} >
          <div>5 <FontAwesomeIcon style={{color:"rgb(220, 220, 0)",fontSize:"15px"}} icon={faStar} />   </div>
          <ProgressBar style={{width:"80%",height:"1vh"}} now={95} label={`${95}%`} visuallyHidden />
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1vh 0"}} >
          <div>4 <FontAwesomeIcon style={{color:"rgb(220, 220, 0)",fontSize:"15px"}} icon={faStar} />   </div>
          <ProgressBar style={{width:"80%",height:"1vh"}} now={3} label={`${3}%`} visuallyHidden />
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1vh 0"}} >
          <div>3 <FontAwesomeIcon style={{color:"rgb(220, 220, 0)",fontSize:"15px"}} icon={faStar} />   </div>
          <ProgressBar style={{width:"80%",height:"1vh"}} now={1} label={`${1}%`} visuallyHidden />
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1vh 0"}} >
          <div>2 <FontAwesomeIcon style={{color:"rgb(220, 220, 0)",fontSize:"15px"}} icon={faStar} />   </div>
          <ProgressBar style={{width:"80%",height:"1vh"}} now={0.4} label={`${0.4}%`} visuallyHidden />
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1vh 0"}} >
          <div>1 <FontAwesomeIcon style={{color:"rgb(220, 220, 0)",fontSize:"15px"}} icon={faStar} />   </div>
          <ProgressBar style={{width:"80%",height:"1vh"}} now={0.1} label={`${0.1}%`} visuallyHidden />
        </div>
      </div> 
      <div className='review-block'>
        <div style={{display:"flex"}}>
         <img style={{width:"7vh",height:"7vh",backgroundColor:"white",borderRadius:"50%",backgroundColor:"gray"}} src={ava_1} />
          <div style={{display:"flex",justifyContent:"center",flexDirection:"column", marginLeft:"1vw"}}>
            <div style={{fontWeight:"bold",fontSize:"20px"}}>Lê Thị Hương</div>
            <div style={{color:"gray",fontSize:"15px"}}>Điều trị từ 2023</div>
          </div>
        </div>
        <q>
            Tôi đã có trải nghiệm tuyệt vời khi sử dụng dịch vụ của bệnh viện này. Từ lúc tôi điều trị, tôi được đón tiếp một cách nhiệt tình và chuyên nghiệp bởi môi trường thoải mái và an toàn cho tôi trong suốt quá trình điều trị.
        </q>
      </div> 
      <div className='review-block'>
        <div style={{display:"flex"}}>
          <img style={{width:"7vh",height:"7vh",backgroundColor:"white",borderRadius:"50%",backgroundColor:"gray"}} src={ava_2} />
          <div style={{display:"flex",justifyContent:"center",flexDirection:"column", marginLeft:"1vw"}}>
            <div style={{fontWeight:"bold",fontSize:"20px"}}>Hoàng Văn Cường</div>
            <div style={{color:"gray",fontSize:"15px"}}>Điều trị từ 2023</div>
          </div>
        </div>
        <q>
        Tôi rất ấn tượng với dịch vụ tại bệnh viện. Tôi nhận thấy mọi người rất tận tâm và chu đáo. Tôi muốn cảm ơn toàn bộ đội ngũ y tế và nhân viên tại bệnh viện ABC vì đã tạo ra một trải nghiệm tuyệt vời cho tôi          </q>
      </div> 
      <div className='review-block'>
        <div style={{display:"flex"}}>
          <img style={{width:"7vh",height:"7vh",backgroundColor:"white",borderRadius:"50%",backgroundColor:"gray"}} src={ava_3} />
          <div style={{display:"flex",justifyContent:"center",flexDirection:"column", marginLeft:"1vw"}}>
            <div style={{fontWeight:"bold",fontSize:"20px"}}>Phó Tuấn Thành</div>
            <div style={{color:"gray",fontSize:"15px"}}>Điều trị từ 2023</div>
          </div>
        </div>
        <q>
        Trải qua trải nghiệm tại bệnh viện, tôi hài lòng với sự chăm sóc và dịch vụ mà tôi nhận được. Đội ngũ y tế và nhân viên đều rất chuyên nghiệp và tận tâm. Họ đã tạo ra một môi trường thân thiện và thoải mái, giúp tôi cảm thấy yên tâm và an toàn.
        </q>
      </div> 
    </div>
  )
}

export default Review
