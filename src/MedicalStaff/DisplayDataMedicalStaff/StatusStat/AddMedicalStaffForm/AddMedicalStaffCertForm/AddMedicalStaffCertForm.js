import React , {useState,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const AddMedicalStaffCertForm = ({setIsSlide2,personalInfo, education}) => {
  const {position} = useParams()
  const [cert , setCert ] = useState([])
  const [validated, setValidated] = useState(false);
  const [error,setError] = useState("")
  const handleDeleteCert = async (index) => {
    setCert((prevCert) =>
      prevCert.filter((_, i) => i !== index)
    );
  }
  const handleAddMedicalStaff = async () =>{
    const data = {
      ...personalInfo,
      education: education,
      cert : cert,
      position: position ==="specialist" ? "Bác sĩ" : position === "nurse" ? "Y tá"  : "Nhân viên hỗ trợ",
    }
    console.log(data)
    axios.post("http://localhost:8080/v1/specialists",data)
      .then((response) => {
        window.open(`http://localhost:4000/medicalstaff/${position}/${response.data.id}`,'_blank')
        window.location.reload();
      })
      .catch((error) => console.log(error))
  }
  const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.stopPropagation();
        setValidated(true);
      } 
      else {
        const date = moment(form.elements.date.value)
        const curDay = moment()
          if(curDay.isBefore(date)){
            setError("thời điểm không hợp lệ")
            return;
          }
        setCert([
          ...cert,
          {
            date: moment(form.elements.date.value,"YYYY-MM-DD").format("DD-MM-YYYY"),
            organization : form.elements.organization.value,
            title : form.elements.title.value
          }
        ])
        form.reset();
        setValidated(false);
      }
    }
    return (
      <Form style={{padding:"2vh 1vw"}} noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3" ><h3>Chứng chỉ</h3></Row>
      <Row className="mb-3">
      {error && (
          <div>
            <style>
              {`
                          .alert-danger {
                          font-size: 15px; /* Điều chỉnh kích thước phù hợp */
                          padding: 10px 15px;
                            }
                          `}
            </style>
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        )}
        <Form.Group as={Col} md="8" controlId="title" >
          <Form.Label>Tên chứng chỉ</Form.Label>
          <Form.Control
            type='text'
            placeholder="Tên chứng chỉ"
            required
           />
          <Form.Control.Feedback type="invalid">
          Chứng chỉ không hợp lệ
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="date" >
          <Form.Label>Ngày cấp</Form.Label>
          <Form.Control type="date"  required/>
          <Form.Control.Feedback type="invalid">
          Thông tin không hợp lệ
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="organization">
            <Form.Label>Tổ chức cấp</Form.Label>
            <Form.Control type="text" placeholder='Tổ chức cấp' required />
            <Form.Control.Feedback type="invalid">
            Thông tin không hợp lệ.
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className='mb-3 mt-3'>
        {cert.map((obj,index) => {
          return(
            <div>
              <span style={{fontSize:"15px",color:"rgb(0,0,0,0.5)",fontWeight:"bold"}}>
                {obj.date.split('-').join("/")} {obj.title} cấp bởi {obj.organization} 
              </span>
              <span className='icon-xmark-educate'  onClick={() => handleDeleteCert(index) }>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          )
        })}
      </Row>
      
<Button onClick={() => setIsSlide2(false)}> Quay lại</Button>
<Button style={{position:"absolute",left:'75%',transform:"translateX(-50%)"}} type="submit" > Thêm chứng chỉ</Button>
<Button disabled={!cert.length} onClick={handleAddMedicalStaff} > 
Thêm {position==="specialist" ? "Bác sĩ" : position==="nurse" ? "y tá" : "nhân viên hỗ trợ"}
</Button>

</Form>

      )
}

export default AddMedicalStaffCertForm;