import React, {useContext}from 'react'
import Header from './Header/Header'
import SignInForm from './SignInForm/SignInForm'
import { displaySignInFormContext } from '../SignInControl/DisplaySignInProvider'
import "./Home.css"
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
      </div>
    </div>
  )
}

export default Home