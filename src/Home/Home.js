import React, { useContext, useEffect, useState } from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Patient from '../Patient/Patient'
import MedicalStaff from '../MedicalStaff/MedicalStaff'
import { Navigate } from 'react-router-dom'
import Medicine from '../Medicine/Medicine'
import Equipment from '../Equipment/Equipment'
import { Routes, Route } from 'react-router-dom';
import { displaySignInFormContext } from '../Provider/DisplaySignInProvider'
import DetailPatient from './DetailInfo/DetailPatient/DetailPatient'
import DetailMedicalStaff from './DetailInfo/DetailMedicalStaff/DetailMedicalStaff'
import Footer from './Footer/Footer'
import RegisterForm from './RegisterForm/RegisterForm'
import SignInForm from './SignInForm/SignInForm'
import { useLocation } from 'react-router-dom'

import "./Home.css"
import axios from 'axios'
const Home = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  const [globalRole, setGlobalRole] = useState(null);

  const [checkLogin, setLogin] = useState(false);

  useEffect(() => {
    const getRole = async () => {
      try {
        const roles = await axios.get("http://localhost:8080/v1/users", { withCredentials: true });
        console.log(roles);
        if (roles.data.message || roles.data === '') {
          console.log("Login failed");
          setLogin(false);
          setGlobalRole("null");
        }
        else {
          // console.log(roles.data.role);
          setLogin(true);
          setGlobalRole(roles.data.role);
        }
      } catch (error) {
        console.log(error);
      }
    };


    getRole();
  }, []);

  console.log(checkLogin);
  if (checkLogin === false && globalRole === "null") {
    return (
      <div className='main-containter'>
        <div className="mainPage">
          {!isLoginRoute && <Header className="navBar" />}
          <Routes>
            <Route path='/' render element={<Body />} />
            <Route path='/login' element={<SignInForm />} />
            <Route path='/patient' element={<SignInForm />}/>
            <Route path='/patient/:id' element={<SignInForm />} />
            <Route path='/medicalStaff/:position' element={<SignInForm />} />
            <Route path='/medicalStaff/:position/:id' element={<SignInForm />} />
            <Route path='/medicine' element={<SignInForm />} />
            <Route path='/equipment' element={<SignInForm />} />
          </Routes>
        </div>
      </div>
    )
  }

  return (

    <div className='main-containter'>


      <div className="mainPage">
        {!isLoginRoute && <Header className="navBar" />}
        <Routes>
          <Route path='/' render element={<Body />} />
          <Route path='/login' element={<SignInForm />} />
          <Route path='/patient' element={ <Patient role = {globalRole}/>} />
          <Route path='/patient/:id' element={<DetailPatient />} />
          <Route path='/medicalStaff/:position' element={<MedicalStaff role={globalRole} />} />
          <Route path='/medicalStaff/:position/:id' element={<DetailMedicalStaff />} />
          <Route path='/medicine' element={<Medicine role = {globalRole}/>} />
          <Route path='/equipment' element={<Equipment role={globalRole} />} />
        </Routes>
        <Footer/>
      </div>
    </div>
  )
}

export default Home 