import React from 'react'
import Card from 'react-bootstrap/Card';
import hospital_intro_staff from "../../../../Image/hospital_intro_staff.jpeg"
import hospital_intro_suport_staff from "../../../../Image/hospital_intro_suport_staff.jpeg"
import hospital_intro_patient from "../../../../Image/hospital_intro_patient.jpeg"
import hospital_intro_equip from "../../../../Image/hospital_intro_equip.jpeg"
import logo from "../../../../Image/logo.png"
import "./CardComponent.css"
const CardComponent = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
    <img style={{width:"20vw",height:"25vh",margin:"2vh 0"}} src={logo} />
    <div className='outer-intro' style={{width:"100%",display:"flex" ,justifyContent:"center"}}>
    <div>
        <Card style={{ width: '20vw',height:"100%",boxShadow:"5px 5px 5px rgba(68, 139, 252, 0.5)" }}>
        <Card.Img style={{height:"20vh"}} variant="top" src={hospital_intro_staff} />
        <Card.Body>
            <Card.Title style={{fontWeight:"bold",fontSize:"22px"}}>Bác sĩ có chuyên môn cao</Card.Title>
            <Card.Text>
            Bệnh viện chúng tôi có đội ngũ bác sĩ chất lượng cao, kiến thức chuyên môn sâu và tinh thần tận tâm. Chúng tôi luôn ưu tiên lợi ích và sức khỏe của bệnh nhân, cung cấp tư vấn và phương pháp điều trị tốt nhất cho từng trường hợp.
            </Card.Text>
        </Card.Body>
        </Card>
    </div>
    <div>
        <Card style={{ width: '20vw',height:"100%",boxShadow:"5px 5px 5px rgba(68, 139, 252, 0.5)" }}>
        <Card.Img style={{height:"20vh"}} variant="top" src={hospital_intro_suport_staff} />
        <Card.Body>
            <Card.Title style={{fontWeight:"bold",fontSize:"22px"}}>Nhân viên hỗ trợ 24/7</Card.Title>
            <Card.Text>
            Chúng tôi cam kết cung cấp hỗ trợ nhanh chóng và hiệu quả cho bệnh nhân. Quý vị có thể liên hệ với chúng tôi vào bất kỳ thời điểm nào, bao gồm cả ban đêm, ngày lễ và cuối tuần. Chúng tôi luôn có nhân viên trực sẵn sàng hỗ trợ và đưa ra các giải pháp tốt nhất cho mọi vấn đề liên quan đến sức khỏe.
            </Card.Text>
        </Card.Body>
        </Card>
    </div>
    <div>
        <Card style={{ width: '20vw',height:"100%",boxShadow:"5px 5px 5px rgba(68, 139, 252, 0.5)" }}>
        <Card.Img style={{height:"20vh"}} variant="top" src={hospital_intro_patient} />
        <Card.Body>
            <Card.Title style={{fontWeight:"bold",fontSize:"22px"}}>Hỗ trợ điều trị nhanh chóng</Card.Title>
            <Card.Text>
            Chúng tôi tự hào với khả năng hỗ trợ điều trị nhanh chóng, đảm bảo sự chăm sóc tốt nhất và giảm thiểu thời gian chờ đợi. Đội ngũ y tế chuyên nghiệp và cơ sở vật chất tiên tiến sẽ đảm bảo bạn nhận được điều trị hiệu quả và nhanh chóng.
            </Card.Text>
        </Card.Body>
        </Card>
    </div> 
    <div>
        <Card style={{ width: '20vw',height:"100%",boxShadow:"5px 5px 5px rgba(68, 139, 252, 0.5)" }}>
        <Card.Img style={{height:"20vh"}} variant="top" src={hospital_intro_equip} />
        <Card.Body>
            <Card.Title style={{fontWeight:"bold",fontSize:"22px"}}>Trang thiết bị hiện đại</Card.Title>
            <Card.Text>
            Bệnh viện chúng tôi tự hào về trang thiết bị hiện đại và tân tiến. Với công nghệ y tế tiên tiến, chúng tôi cung cấp chất lượng cao và chăm sóc tối ưu cho bệnh nhân. Đội ngũ chuyên gia giàu kinh nghiệm đảm bảo sự chăm sóc tốt nhất.
            </Card.Text>
        </Card.Body>
        </Card>
    </div> 
    </div>
    </div>
  )
}

export default CardComponent
