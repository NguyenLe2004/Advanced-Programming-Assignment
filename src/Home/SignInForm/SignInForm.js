import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import hospitalImg from "../../Image/hospital_cartoon.jpeg"
import "./SignInForm.css"

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const submitBtnLoad = () => {
    setIsLoading(true);
  }

  const submitBtnNotLoad = () => {
    setIsLoading(false);
  }
  

  return (
  <div className='outer-sign-in' >
    <div style={{display:"flex", position:"relative",width:"fit-content",borderRadius:"10px",overflow:"hidden",height:"80vh"}}>
        <img className="backgound" src={hospitalImg} />
        <Form noValidate className="loginForm" validated={validated} onSubmit={handleSubmit}>
            <h1>Đăng nhập</h1> 
            <Form.Group className="mb-3"  controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control pattern=".+@.+\.[A-Za-z]+$" required type="email" placeholder="Enter email"/>
                <Form.Control.Feedback type='invalid'  >Email không hợp lệ</Form.Control.Feedback>
            </Form.Group> 
            <Form.Group style={{position:"relative"}} className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type={passwordVisible ? 'text' : 'password'} placeholder="Password"/>
                <FontAwesomeIcon className='eye-icon' onClick={togglePasswordVisibility} icon={passwordVisible ? faEyeSlash : faEye} />
                <Form.Control.Feedback type="invalid">Password không hợp lệ</Form.Control.Feedback>
            </Form.Group>
            <div className="submitBtn">
              <Button disabled={isLoading} variant="primary" type="submit">
                {isLoading? "Loading...." : "submit"}
              </Button>
            </div>
        </Form>
    </div>
    </div>
  )
}

export default SignInForm;