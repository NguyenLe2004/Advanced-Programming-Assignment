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
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
const NavigatorBar = () => {
  const { isSignIn, setIsSignIn } = useContext(signInContext);
  const { isDisplaySignInForm, setIsDisplaySignInForm } = useContext(displaySignInFormContext);
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


          <li style={{right}}>
            <div className="dropdown show">
              <button className="btn dropdown-toggle" style={{ border: "transparent" }}
                id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <img className='profileImage' src={""} alt='Profile' />
              </button>

              <div className="dropdown-menu">
                <li><a className="dropdown-item" href="/myProfile">My Profile</a></li>
                <li><a className="dropdown-item" href="/myDashboard">My Dashboard </a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/signOut">Signout</a></li>
              </div>
            </div>
          </li>

        </ul>




      </nav>
    </div>
  );
}

export default NavigatorBar
