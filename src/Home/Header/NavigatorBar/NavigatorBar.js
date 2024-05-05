import React, { useContext, useState, useRef, useEffect } from 'react'
import { signInContext } from '../../../Provider/SignInProvider';
import { displaySignInFormContext } from '../../../Provider/DisplaySignInProvider';
import { faUser, faUserDoctor, faUserNurse, faHeadset, faPills, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./NavigatorBar.css"
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import eximg from "../../../Image/example-img.jpeg"
// import Profile from '../../../Profile/Profile';
const NavigatorBar = ({ role }) => {
  const { isSignIn, setIsSignIn } = useContext(signInContext);
  const { isDisplaySignInForm, setIsDisplaySignInForm } = useContext(displaySignInFormContext);
  const [isDisplayDropDown, setIsDisplayDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const routeChange = useNavigate();

  const displaySignInForm = () => {
    setIsDisplaySignInForm(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/v1/users/logout', null, { withCredentials: true });
      if (response.data.message) {
        console.log("logout successed");
        routeChange('/login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSignOut = () => {
    setIsSignIn(false);
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDisplayDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className='nav-bar' >
      <nav >
        <ul>
          <li className='brand'> <a style={{ fontFamily: "Brush Script MT, Brush Script Std, cursive" }} href='/'>BK Heath Care</a></li>
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
          
          {(role) ?
            <li >
              {(role === "admin") && <Button href='/register'>Add user</Button>}
            </li>
            :
            <li > <Button style={{ position: "absolute", right: "5vw", display: "flex", flexDirection: "column" }} href='/login'>Đăng nhập</Button></li>
          }


          {(role) && <li >
            <div style={{ position: "absolute", right: "5vw", display: "flex", flexDirection: "column" }} >
              <img style={{ height: "4vh", width: "4vh", borderRadius: "50%", position: "absolute", right: "1vw" }} onClick={() => setIsDisplayDropDown(true)} className='profileImage' src={eximg} alt='Profile' />
              {isDisplayDropDown && <div ref={dropdownRef} className='user-option'>
                <li><a href="/profile">My Profile</a></li>
                <li><a onClick={handleSubmit} href="/login">Sign out</a></li>
                <li><a href="/login">Sign in</a></li>
              </div>}
            </div>
          </li>}
        </ul>

      </nav>
    </div>
  );
}

export default NavigatorBar
