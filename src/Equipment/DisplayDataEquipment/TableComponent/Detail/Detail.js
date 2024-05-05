import React , {useState, useEffect, useContext} from 'react'
import CloseButton from 'react-bootstrap/CloseButton';
import InfoEquipment from './InfoEquipment/InfoEquipment';
import UpdateEquipmentForm from './UpdateEquipmentForm/UpdateEquipmentForm';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import "./Detail.css"
import { Form } from 'react-bootstrap';

const Detail = ({detailData,setIsDisplayDetail}) => {
  const [isUpdate , setIsUpdate ] = useState(false);
  const [imageURL ,setImageURL] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else{
      const data = {
        regularMaintenance : detailData.regularMaintenance,
        name : form.elements.name.value
      }
      console.log(data)
      axios.put("http://localhost:8080/v1/equipments/" + detailData.id,data)
        .then(() => window.location.reload())
        .catch(error => console.error(error))
    }

    setValidated(true);
  };
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
    <div className='background-equipment-detail'>
        <div className='main-equipment-detail'>
            <p style={{position:"absolute",right:"1vh",top:"1vh",fontSize:"20px"}}><CloseButton onClick={() => setIsDisplayDetail(false)} /></p>
            <div className='conatiner-img-info'>

             <span style={{display:"flex",flexDirection:"column"}}>
              <h2 style={{display:"flex",fontWeight:"bold"}}> 
                  {
                    !isUpdate? (
                      <div>{detailData.name}</div>
                    ) : (
                      <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId='name' >
                          <Form.Control required type='text' defaultValue={detailData.name} />
                        </Form.Group>
                      </Form>
                    )
                  }
                  <p className='update-equipment-icon' ><FontAwesomeIcon icon={faPen} onClick={() => setIsUpdate(prev => !prev)} /></p>
              </h2>
              <div className='mb-3'>
                  <h4 className={`status-popup ${getEquipmentStatusClass(detailData.status)}`}> {detailData.status} </h4>
              </div>
              <img className='equipment-pic' src="https://thuochapu.com/images/medicine/panadol-extra.png" />
            </span> 
                
                <div className='info-update-block' style={{width:"50%",height:"fit-content"}}>
                  <InfoEquipment equipmentData={detailData} />
                </div>
             </div>
        </div>
    </div> 
  )
}

export default Detail;