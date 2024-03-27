import React, {createContext, useState} from 'react'
const displaySignInFormContext = createContext();

const DisplaySignInProvider = ({children}) => {
    const [isDisplaySignInForm, setIsDisplaySignInForm] = useState(false);
  return (
    <displaySignInFormContext.Provider value={{isDisplaySignInForm, setIsDisplaySignInForm}}>
      {children}
    </displaySignInFormContext.Provider>
  )
}

export {displaySignInFormContext, DisplaySignInProvider};