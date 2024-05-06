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
import { useNavigate } from 'react-router-dom'


import "./Home.css"
import axios from 'axios'
import Profile from '../Profile/Profile'

const Home = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  const [globalRole, setGlobalRole] = useState(null);
  const [globalEmail, setEmail] = useState(null);
  const [globalName, setName] = useState(null);
  const [globalID, setID] = useState(null);
  const routeChange = useNavigate();

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
          setEmail(null);
          setName(null);
          setID(null);
        }
        else {
          // console.log(roles.data.role);
          setLogin(true);
          setGlobalRole(roles.data.role);
          setEmail(roles.data.email);
          setName(roles.data.name);
          setID(roles.data.id);
        }
      } catch (error) {
        console.log(error);
      }
    };


    getRole();
  }, []);

  if (checkLogin === false && globalRole === "null") {
    if((location.pathname !== "/") && (location.pathname !== "/login")){
      return <Navigate to= '/login' replace/>
    }
    return (
      <div className='main-containter'>
        <div className="mainPage">
        {!isLoginRoute && <Header className="navBar" role = {""} />}
          <Routes>
            <Route path='/' render element={<Body role = {globalRole} />} />
            <Route path='/login' element={<SignInForm />} />
            <Route path='/profile' onClick= {()=> {routeChange('/login')}} element={<SignInForm />} />
            <Route path='/patient' element={<SignInForm />}/>
            <Route path='/patient/:id' element={<SignInForm />} />
            <Route path='/medicalStaff/:position' element={<SignInForm />} />
            <Route path='/medicalStaff/:position/:id' element={<SignInForm />} />
            <Route path='/medicine' element={<SignInForm />} />
            <Route path='/equipment' element={<SignInForm />} />
          </Routes>
          <Footer/>
        </div>
      </div>
    )
  }

  return (

    <div className='main-containter'>
      <div className="mainPage">
        {!isLoginRoute && <Header className="navBar" role = {globalRole} />}
        <Routes>
          <Route path='/' render element={<Body />} />
          <Route path='/login' element={<SignInForm />} />
          <Route path='/register' element={< RegisterForm role = {globalRole}/>} />
          <Route path='/profile' element={<Profile email = {globalEmail} name = {globalName} role = {globalRole} id = {globalID}/>} />
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