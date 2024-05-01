import React , {useState, useEffect, useContext} from 'react'
import CloseButton from 'react-bootstrap/CloseButton';
import InfoMedicine from './InfoMedicine/InfoMedicine';
import UpdateMedicineForm from './UpdateMedicineForm/UpdateMedicineForm';
import axios from 'axios'
import "./Detail.css"

const Detail = ({detailData,setIsDisplayDetail}) => {
  const [isUpdate , setIsUpdate ] = useState(false);
  const [imageURL ,setImageURL] = useState("");
  // useEffect(() => {
  //     const apiKey = "AIzaSyCvUMpFuTaDesQEq9J8LGp5QneUiG_nWYs"
  //     const cx = "31c42af1a50d34eeb"
  //     const fetchImage = async () => {
  //       try {
  //         const params = {
  //           q: "Hộp thuốc " +  detailData.name + ":300x300",
  //           key: apiKey, 
  //           searchType: "image",
  //           cx: cx
  //           // num : 1
  //         };
    
  //         const response = await axios.get("https://www.googleapis.com/customsearch/v1", { params });
  //         // console.log(response.data.items)
  //         // setImageURL(response.data.items[0].image.thumbnailLink);
  //         if (response.data.items && response.data.items.length > 0) {
  //           Object.keys(response.data.items).forEach((obj, index) => {
  //             console.log(response.data.items[obj]);
  //             if (response.data.items[obj].image.thumbnailHeight >= 150 && response.data.items[obj].image.thumbnailWidth >= 150) {
  //               setImageURL(response.data.items[obj].image.thumbnailLink);
  //               return;
  //             }
  //           });
  //         } else {
  //           console.log("No image found for", detailData.name);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching image:", error);
  //       }
  //     };
    
  //     fetchImage();
  // },[detailData])
  return (
    <div className='background-medicine-detail'>
        <div className='main-medical-detail'>
            <p style={{position:"absolute",right:"1vh",top:"1vh",fontSize:"20px"}}><CloseButton onClick={() => setIsDisplayDetail(false)} /></p>
             <div className='conatiner-img-info'>
                <img className='medicine-pic' src="https://thuochapu.com/images/medicine/panadol-extra.png" />
                <div className='info-update-block' style={{width:"50%",height:"fit-content"}}>
                  {!isUpdate? (
                    <InfoMedicine medicineData = {detailData} setIsUpdate = {setIsUpdate}/>
                  ) : (
                    <UpdateMedicineForm  medicineData = {detailData} setIsUpdate = {setIsUpdate} />
                  )}
                </div>
             </div>

        </div>
    </div> 
  )
}

export default Detail;