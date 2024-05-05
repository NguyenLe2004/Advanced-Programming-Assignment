import React, {useContext, useState}from 'react'
import Header from './Header/Header'
import Body from './Body/Body'
import Patient from '../Patient/Patient'
import MedicalStaff from '../MedicalStaff/MedicalStaff'
import Medicine from '../Medicine/Medicine'
import Equipment from '../Equipment/Equipment'
import { Routes, Route } from 'react-router-dom';
import { displaySignInFormContext } from '../Provider/DisplaySignInProvider'
import DetailPatient from './DetailInfo/DetailPatient/DetailPatient'
import DetailMedicalStaff from './DetailInfo/DetailMedicalStaff/DetailMedicalStaff'
import Footer from './Footer/Footer'
import SignInForm from './SignInForm/SignInForm'
import { useLocation } from 'react-router-dom'
import "./Home.css"
const Home = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  return (
    <div className='main-containter'> 
    <div className="mainPage">
      {!isLoginRoute&& <Header className = "navBar"/>}
          <Routes>
            <Route path ='/' element = {<Body/>} />
            <Route path='/login' element = {<SignInForm />} />
            <Route path='/patient' element ={<Patient/>}/>
            <Route path='/medicalStaff/:position/:id' element ={<DetailMedicalStaff/>}/>
            <Route path = '/patient/:id' element={<DetailPatient/>} />
            <Route path='/medicalStaff/:position' element ={<MedicalStaff/>}/>
            <Route path='/medicine' element ={<Medicine />}/>
            <Route path='/equipment' element ={<Equipment/>}/>
          </Routes>
        {!isLoginRoute && <Footer/>}
    </div>
    </div>
  )
}

export default Home 