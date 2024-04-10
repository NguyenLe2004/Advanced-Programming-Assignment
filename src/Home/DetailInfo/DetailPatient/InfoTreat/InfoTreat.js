import React, {useEffect,useState} from 'react'
import TreatProcess from './TreatProcess/TreatProcess'
import TreatForm from './TreatForm/TreatForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./InfoTreat.css"
const InfoTreat = ({patient}) => {
  const [showButton, setShowButton] = useState(false);
  const [showTreatForm, setShowTreatForm] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if(patient.status === "Hoàn thành điều trị") return;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition >= windowHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div >
        <div className='treat-title'>Tiến trình điều trị</div>

        <div className='add-treat-block'>
          <div>
            <button className={`add-treat-btn ${showButton? "show":""}`} onClick={() => setShowTreatForm((prevState) => !prevState)}>
              <span>
                <FontAwesomeIcon style={{fontSize:"20px"}} icon={faPlus} />
              </span>
              <span>
                Thêm lịch điều trị
              </span>
            </button>
          </div>
          <div  className={ `prev-form ${(showTreatForm && showButton )? "show-form" : ""}`}><TreatForm patient={patient}/></div>
        </div>
        <div className={
              `all-status status-${patient.status === "Đang điều trị" ? "on-going" : 
              patient.status === "Chưa điều trị" ? "not" : "complete"
              }`}>{patient.status} </div>
        <div className='main-treat'>
            <div className='side-bar'></div>
            <TreatProcess patient={patient} />
        </div>

    </div>
  )
}

export default InfoTreat;