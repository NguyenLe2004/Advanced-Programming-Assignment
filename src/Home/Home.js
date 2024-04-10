import React, {useContext, useEffect}from 'react'
import Header from './Header/Header'
import SignInForm from './SignInForm/SignInForm'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import Patient from '../Patient/Patient'
import Specialist from '../Specialist/Specialist'
import { Routes, Route } from 'react-router-dom';
import { displaySignInFormContext } from '../Provider/DisplaySignInProvider'
import DetailPatient from './DetailInfo/DetailPatient/DetailPatient'
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
          <Route path = '/patient/:id' element={<DetailPatient/>} />
          <Route path='/specialist' element ={<Specialist/>}/>
          <Route path='/nurse' element ={<div> nurse here</div>}/>
          <Route path='/support' element ={<div> support here</div>}/>
          <Route path='/medicine' element ={<div> medicine here</div>}/>
          <Route path='/equipment' element ={<div> equipment here</div>}/>
        </Routes>
        {/* <Footer/> */}
      </div>
    </div>
  )
}

export default Home 