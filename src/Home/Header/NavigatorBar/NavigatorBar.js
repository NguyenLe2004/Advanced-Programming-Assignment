import React, {useContext} from 'react'
import { signInContext } from '../../../Provider/SignInProvider';
import { displaySignInFormContext } from '../../../Provider/DisplaySignInProvider';
import { faHouse, faUser, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./NavigatorBar.css"
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
      <div className='nav-bar'>
        <nav>
          <ul>
            <li className='brand'> <a href='/'>BK Heath Care</a></li>
            <li className='icon-block'>
              <a href='/'><FontAwesomeIcon icon={faHouse}/></a>
              <div className='label'>Trang chủ</div>
            </li>
            <li className='icon-block'>
              <a href='/Patient'><FontAwesomeIcon icon={faUser}/></a>
              <div className='label'>Bệnh nhân</div>
            </li>
            <li className='icon-block'>
              <a href='/Patient'><FontAwesomeIcon icon={faUserDoctor} /></a>
              <div className='label'>Bác sĩ</div>
            </li>
          </ul>
        </nav>
      </div>
      );
}

export default NavigatorBar
