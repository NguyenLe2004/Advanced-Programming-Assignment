import React, { useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import hospitalImg from "../../Image/hospital_cartoon.jpeg"
import logo from "../../Image/logo.png"
import "./SignInForm.css"

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDisplayEyeIcon, setIsDisplayEyeIcon] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const handleKeyPress = (event) => {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  //-------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else {
      const data= { 
        email: form.elements.email.value, 
        password: form.elements.password.value, 
      }
      console.log(data.email);
      console.log(data.password);
    try {
        const response = await axios.post('http://localhost:8080/v1/users/login',data, { withCredentials: true }); 
        
        if (response.data.message)
          console.log("Login failed");
        if(response.data.role)
          window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }

    setValidated(true);
  };

  const submitBtnLoad = () => {
    setIsLoading(true);
  }

  const submitBtnNotLoad = () => {
    setIsLoading(false);
  }
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
  <div className='outer-sign-in' >
    <div style={{display:"flex", position:"relative",width:"fit-content",borderRadius:"10px",overflow:"hidden",height:"80vh"}}>
        <img className="backgound" src={hospitalImg} />
        <Form noValidate className="loginForm" validated={validated} onSubmit={handleSubmit}>
        <div style={{display: "flex",justifyContent:"center",alignItems:"center",fontWeight:"bold",flexDirection:"column",marginBottom:"2vh"}}>
          <img style={{height:"15vh",width:"15vw"}} src={logo} />
          <div style={{fontWeight:"bold",fontSize:"60px",marginTop:"2vh"}}>Đăng nhập</div>
        </div>
            <Form.Group className="mb-3"  controlId="email">
                <Form.Label style={{fontWeight:"bold"}}>Email</Form.Label>
                <Form.Control pattern=".+@.+\.[A-Za-z]+$" required type="email" placeholder="name@example.com"/>
                <Form.Control.Feedback type='invalid'  >Email không hợp lệ</Form.Control.Feedback>
            </Form.Group> 
            <Form.Group style={{position:"relative"}} className="mb-3" controlId="password">
                <Form.Label style={{fontWeight:"bold"}}>Password</Form.Label>
                <Form.Control onClick={()=>setIsDisplayEyeIcon(true)} required type={passwordVisible ? 'text' : 'password'} placeholder="Password"/>
                <FontAwesomeIcon className='eye-icon' onClick={togglePasswordVisibility} icon={passwordVisible ?  faEye : faEyeSlash} />
                <Form.Control.Feedback type="invalid">Password không hợp lệ</Form.Control.Feedback>
            </Form.Group>
            <div className="submitBtn">
              <Button disabled={isLoading} style={{width:"100%",marginTop:"2vh"}} variant="primary" type="submit">
                {isLoading? "Loading...." : "submit"}
              </Button>
            </div>
        </Form>
    </div>
    </div>
  )
}

export default SignInForm;