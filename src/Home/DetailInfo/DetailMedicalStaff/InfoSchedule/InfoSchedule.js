import React, {useEffect,useState} from 'react'
import ScheduleProcess from './ScheduleProcess/ScheduleProcess'
import ScheduleForm from './ScheduleForm/ScheduleForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./InfoSchedule.css"
const InfoSchedule = ({medicalStaff}) => {
  const [showButton, setShowButton] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if(medicalStaff.status === "Hoàn thành điều trị") return;
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
        <div className='schedule-title'>Tiến trình điều trị</div>

        <div className='add-schedule-block'>
          <div>
            <button className={`add-schedule-btn ${showButton? "show":""}`} onClick={() => setShowScheduleForm((prevState) => !prevState)}>
              <span>
                <FontAwesomeIcon style={{fontSize:"20px"}} icon={faPlus} />
              </span>
              <span>
                Thêm lịch điều trị
              </span>
            </button>
          </div>
          <div  className={ `prev-form ${(showScheduleForm && showButton )? "show-form" : ""}`}><ScheduleForm medicalStaff={medicalStaff}/></div>
        </div>
        <div className={
              `all-status status-${medicalStaff.status === "Đang làm việc" ? "on-going" : 
              medicalStaff.status === "Nghỉ phép" ? "not" : "complete"
              }`}>{medicalStaff.status} </div>
        <div className='main-schedule'>
            <div className='side-bar'></div>
            <ScheduleProcess medicalStaff={medicalStaff} />
        </div>

    </div>
  )
}

export default InfoSchedule;