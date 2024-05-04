import React, {useContext} from 'react'
import { signInContext } from '../../../Provider/SignInProvider';
import { displaySignInFormContext } from '../../../Provider/DisplaySignInProvider';
import { faHouse, faUser, faUserDoctor, faUserNurse, faHeadset, faPills,faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./NavigatorBar.css"
import { Button } from 'react-bootstrap';
const NavigatorBar = () => {
  const {isSignIn,setIsSignIn} = useContext(signInContext);
  const {isDisplaySignInForm,setIsDisplaySignInForm} = useContext(displaySignInFormContext);

  const displaySignInForm = () => {
    setIsDisplaySignInForm(true);
  }

  const handleSignOut = () => {
    setIsSignIn(false);
  }
    return (
      <div className='nav-bar' >
        <nav >
          <ul>
            <li className='brand'> <a href='/'>BK Heath Care</a></li>
            <li className='icon-block'>
              <a href='/'><FontAwesomeIcon icon={faHouse}/></a>
              <div className='label'>Trang chủ</div>
            </li>
            <li className='icon-block'>
              <a href='/patient'><FontAwesomeIcon icon={faUser}/></a>
              <div className='label'>Bệnh nhân</div>
            </li>
            <li className='icon-block'>
              <a href='/medicalStaff/specialist'><FontAwesomeIcon icon={faUserDoctor} /></a>
              <div className='label'>Bác sĩ</div>
            </li>
            <li className='icon-block'>
              <a href='/medicalStaff/nurse'><FontAwesomeIcon icon={faUserNurse} /></a>
              <div className='label'>Y tá</div>
            </li>
            <li className='icon-block'>
              <a href='/medicalStaff/support'><FontAwesomeIcon icon={faHeadset} /></a>
              <div className='label'>Hỗ trợ</div>
            </li>
            <li className='icon-block'>
              <a href='/medicine'><FontAwesomeIcon icon={faPills} /></a>
              <div className='label'> Thuốc</div>
            </li>
            <li className='icon-block'>
              <a href='/equipment'><FontAwesomeIcon icon={faScrewdriverWrench} /></a>
              <div className='label'>thiết bị</div>
            </li>
          </ul>
          <div className='login-btn' ><Button href="/login" >Đăng nhập</Button></div>
        </nav>
      </div>
      );
}

export default NavigatorBar
