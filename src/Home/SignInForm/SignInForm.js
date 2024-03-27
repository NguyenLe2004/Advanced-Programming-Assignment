import React, {useContext, useState} from 'react'
import { displaySignInFormContext } from '../../SignInControl/DisplaySignInProvider';
import { signInContext } from '../../SignInControl/SignInProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import "./SignInForm.css"

const SignInForm = () => {
  const {setIsDisplaySignInForm} = useContext(displaySignInFormContext);
  const {setIsSignIn} = useContext(signInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const hideSignInForm = () =>{
    setIsDisplaySignInForm(false);
  }

  const hideSignInBtn = () => {
    setIsSignIn(true);
  }
  // Handle Exception 
  const handleInputEmailChange = (event) => {
    setErrorEmail("");
    setEmail(event.target.value)
  }

  const handleInputPasswordChange = (event) => {
    setErrorPassword("");
    setPassword(event.target.value)
  }

  const handleSubmitException = (event) => {
    event.preventDefault();
    if (email === "") {
      setErrorEmail("Please enter email");
      return;
    }
    if (password === "") {
      setErrorPassword("Please enter password");
    }
  }

  const submitLogin = async (event) => {
    handleSubmitException(event);
    axios.post('http://localhost:5000/api/users/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      if (response.data.success) {
        hideSignInForm();
        hideSignInBtn();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
        <Form className="loginForm" noValidate onSubmit={submitLogin}>
            <FontAwesomeIcon icon={faXmark} className="closeBtn" onClick={hideSignInForm}/>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" value={email} onChange={handleInputEmailChange}/>
            </Form.Group>
            {errorEmail && 
            <p>{errorEmail}</p>}
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" value={password} onChange={handleInputPasswordChange} />
            </Form.Group>
            {errorPassword && 
            <p>{errorPassword}</p>}
            <div className="submitBtn">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
        </Form>
    </div>
  )
}

export default SignInForm;