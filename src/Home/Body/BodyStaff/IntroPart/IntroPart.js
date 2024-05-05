import React from 'react'
import hospital_intro_img from "../../../../Image/hospital_intro_img.jpeg"
import logo from "../../../../Image/logo.png"

const IntroPart = () => {
  return (
    <div style={{marginTop:"7vh",backgroundColor:"rgb(128,128,128,0.1)",width:"90%",height:"fit-content",padding:"5vh 2vw",display:"flex"}}>
    <img style={{height:"45vh",width:"50vw",borderRadius:"10px"}}  src={hospital_intro_img} />
    <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",justifyContent:"center"}}>
        <div><img style={{height:"25vh",width:"20vw"}} src={logo} /></div>
        <h1 style={{fontSize:"40px",marginTop:"5vh",fontWeight:"bold",textShadow:"7px 7px 4px rgb(50,160,255,0.5)",color:"rgb(50,160,255)"}}>LÀM VIỆC CHUYÊN NGHIỆP</h1>
     </div>
  </div>
  )
}

export default IntroPart;