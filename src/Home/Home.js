import React, {useContext, useEffect}from 'react'
import Header from './Header/Header'
import SignInForm from './SignInForm/SignInForm'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import Patient from '../Patient/Patient'
import { Routes, Route } from 'react-router-dom';
import { displaySignInFormContext } from '../SignInControl/DisplaySignInProvider'
import { preventOperateContext } from '../DisplayDataAllProvider/PreventOperateProvider'
import "./Home.css"
const Home = () => {
  const {isDisplaySignInForm,setIsDisplaySignInForm} = useContext(displaySignInFormContext);
  const {isPreventOperate} = useContext(preventOperateContext);

  const hideSignInForm = () => { // hide login form if click outside 
    if(isDisplaySignInForm) {
      setIsDisplaySignInForm(false);
    }
  };

  useEffect(() => {
    console.log("prevent",isPreventOperate);
  },[isPreventOperate])
  return (
    <div> 
      {isDisplaySignInForm && (
        <SignInForm/>
      )}

      <div onClick={hideSignInForm} className={`mainPage-${isDisplaySignInForm? 'whileDisplayForm' : ''}`}>
        {isPreventOperate && (
          <div className='prevent'></div>
        )}
        <Header/>
        <Routes>
          <Route path ='/' element = {<Body/>} />
          <Route path='/patient' element ={<Patient/>}/>
          <Route path='/specialist' element ={<div> specialist here</div>}/>
          <Route path='/nurse' element ={<div> nurse here</div>}/>
          <Route path='/support' element ={<div> support here</div>}/>
          <Route path='/medicine' element ={<div> medicine here</div>}/>
          <Route path='/equipment' element ={<div> equipment here</div>}/>
        </Routes>
        <Footer/>
      </div>
    </div>
  )
}

export default Home 