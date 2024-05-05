import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import logo from "../../Image/logo.png"
import Row from 'react-bootstrap/Row';
import "./RegisterForm.css"
import axios from 'axios';
const RegisterForm = ({ role }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDisplayEyeIcon, setIsDisplayEyeIcon] = useState(false);
  const [error, setError] = useState("")
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else {
      const data = {
        name : form.elements.name.value,
        email : form.elements.email.value,
        password : form.elements.password.value, 
        role : form.elements.role.value
      }
      
      if (data.password !== form.elements.rePassword.value) {
        setError("Mật khẩu không trùng khớp")
        return;
      }
      try {
        const response = await axios.post('http://localhost:8080/v1/users/register', data, { withCredentials: true });
        // console.log(response);
        console.log(response.data); 
        if (response.data.message)
          console.log(response.data.message);
        if (response.data.role)
          window.location.href = '/';
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };

  return (
    <div style={{ minHeight: "fit-content", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Form noValidate className="RegisterForm" validated={validated} onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", flexDirection: "column", marginBottom: "2vh" }}>
          <img style={{ height: "15vh", width: "15vw" }} src={logo} />
          <div style={{ fontWeight: "bold", fontSize: "60px", marginTop: "2vh" }}>Cấp tài khoản</div>
          {error &&
            <div style={{ padding: "1vh", borderRadius: "12px", fontWeight: "bold", backgroundColor: "rgb(255,0,0,0.9)", color: "white", fontSize: "22px" }}>{error} </div>}
        </div>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label style={{ fontWeight: "bold" }}>Username</Form.Label>
          <Form.Control pattern="[^0-9]*" required type="name" placeholder="Nguyen Van A+" />
          <Form.Control.Feedback type='invalid'  >Tên không hợp lệ</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
          <Form.Control pattern=".+@.+\.[A-Za-z]+$" required type="email" placeholder="name@example.com" />
          <Form.Control.Feedback type='invalid'  >Email không hợp lệ</Form.Control.Feedback>
        </Form.Group>
        <Form.Group style={{ position: "relative" }} className="mb-3" controlId="password">
          <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
          <Form.Control onClick={() => setIsDisplayEyeIcon(true)} required type={passwordVisible ? 'text' : 'password'} placeholder="Password" />
          <FontAwesomeIcon className='eye-icon' onClick={togglePasswordVisibility} icon={passwordVisible ? faEye : faEyeSlash} />
          <Form.Control.Feedback type="invalid">Password không hợp lệ</Form.Control.Feedback>
        </Form.Group>
        <Form.Group style={{ position: "relative" }} className="mb-3" controlId="rePassword">
          <Form.Label style={{ fontWeight: "bold" }}>Nhập lại password</Form.Label>
          <Form.Control onClick={() => setIsDisplayEyeIcon(true)} required type={'password'} placeholder="password" />
          <Form.Control.Feedback type="invalid">Password không hợp lệ</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' as={Col} md='4' controlId='role'>
          <Form.Label style={{ fontWeight: "bold" }}>Role</Form.Label>
          <Form.Select required>
            <option></option>
            <option>admin</option>
            <option>doctor</option>
            <option>nurse</option>
            <option>supporter</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">Role không hợp lệ</Form.Control.Feedback>
        </Form.Group>
        <div className="submitBtn">
          <Button disabled={isLoading} style={{ width: "100%", marginTop: "2vh" }} variant="primary" type="submit">
            {isLoading ? "Loading...." : "Cấp tài khoản"}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default RegisterForm
