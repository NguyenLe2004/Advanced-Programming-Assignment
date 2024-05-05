import React, { useContext } from 'react'
import { signInContext } from '../../../Provider/SignInProvider';
import { displaySignInFormContext } from '../../../Provider/DisplaySignInProvider';
import { faHouse, faUser, faUserDoctor, faUserNurse, faHeadset, faPills, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./NavigatorBar.css"
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const NavigatorBar = () => {
  const { isSignIn, setIsSignIn } = useContext(signInContext);
  const { isDisplaySignInForm, setIsDisplaySignInForm } = useContext(displaySignInFormContext);

  const displaySignInForm = () => {
    setIsDisplaySignInForm(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/v1/users/logout', null, { withCredentials: true });
      if (response.data.message){
        console.log("logout successed");
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSignOut = () => {
    setIsSignIn(false);
  }
  return (
    <div className='nav-bar' >
      <nav >
        <ul>
          <li className='brand'> <a style={{fontFamily: "Brush Script MT, Brush Script Std, cursive"}} href='/'>BK Heath Care</a></li>
          <li className='icon-block'>
            <a href='/patient'><FontAwesomeIcon icon={faUser} /></a>
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
          <li>
            <div>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/">Home</Dropdown.Item>
                  <Dropdown.Item href="/login">Login</Dropdown.Item>
                  <Dropdown.Item onClick={handleSubmit} href="/login">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>

        </ul>




      </nav>
    </div>
  );
}

export default NavigatorBar
