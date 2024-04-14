import React, {useContext, useEffect}from 'react'
import Header from './Header/Header'
import SignInForm from './SignInForm/SignInForm'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import Patient from '../Patient/Patient'
import MedicalStaff from '../MedicalStaff/MedicalStaff'
import Medicine from '../Medicine/Medicine'
import Equipment from '../Equipment/Equipment'
import { Routes, Route } from 'react-router-dom';
import { displaySignInFormContext } from '../Provider/DisplaySignInProvider'
import DetailPatient from './DetailInfo/DetailPatient/DetailPatient'
import DetailMedicalStaff from './DetailInfo/DetailMedicalStaff/DetailMedicalStaff'
import "./Home.css"
const Home = () => {
  const {isDisplaySignInForm,setIsDisplaySignInForm} = useContext(displaySignInFormContext);

  const hideSignInForm = () => { // hide login form if click outside 
    if(isDisplaySignInForm) {
      setIsDisplaySignInForm(false);
    }
  };
  return (
    <div className='main-containter'> 
      {isDisplaySignInForm && (
        <SignInForm/>
      )}

      <div onClick={hideSignInForm} className={`mainPage-${isDisplaySignInForm? 'whileDisplayForm' : ''}`}>
        <Header className = "navBar"/>
        <Routes>
          <Route path ='/' element = {<Body/>} />
          <Route path='/patient' element ={<Patient/>}/>
          <Route path='/medicalStaff/:position/:id' element ={<DetailMedicalStaff/>}/>
          <Route path = '/patient/:id' element={<DetailPatient/>} />
          <Route path='/medicalStaff/:position' element ={<MedicalStaff/>}/>
          <Route path='/medicine' element ={<Medicine />}/>
          <Route path='/equipment' element ={<Equipment/>}/>
        </Routes>
        {/* <Footer/> */}
      </div>
    </div>
  )
}

export default Home 