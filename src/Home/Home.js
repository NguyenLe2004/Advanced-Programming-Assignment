import React, {useContext}from 'react'
import Header from './Header/Header'
import SignInForm from './SignInForm/SignInForm'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import Patient from '../Patient/Patient'
import { Routes, Route } from 'react-router-dom';
import { displaySignInFormContext } from '../SignInControl/DisplaySignInProvider'
import "./Home.css"
import Medicine from '../Medicine/Medicine';
import Specialist from '../Specialist/Specialist'
import Equipment from '../Equipment/Equipment'
import SuportStaff from '../SuportStaff/SuportStaff'
const Home = () => {
  const {isDisplaySignInForm,setIsDisplaySignInForm} = useContext(displaySignInFormContext);

  const hideSignInForm = () => { // hide login form if click outside 
    if(isDisplaySignInForm) {
      setIsDisplaySignInForm(false);
    }
  };

  return (
    <div> 
      {isDisplaySignInForm && (
        <SignInForm/>
      )}
      <div onClick={hideSignInForm} className={`mainPage-${isDisplaySignInForm? 'whileDisplayForm' : ''}`}>
        <Header/>
        <Routes>
          <Route path ='/' element = {<Body/>} />
          <Route path='/patient' element ={<Patient/>}/>
          <Route path='/specialist' element ={<Specialist/>}/>
          <Route path='/nurse' element ={<div> nurse here</div>}/>
          <Route path='/support' element ={<SuportStaff/>}/>
          <Route path='/medicine' element ={<Medicine/>}/>
          <Route path='/equipment' element ={<Equipment/>}/>
        </Routes>
        
        <Footer/>
      </div>
    </div>
  )
}

export default Home 