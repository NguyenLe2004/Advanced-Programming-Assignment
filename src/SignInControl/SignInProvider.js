import React,{createContext, useState} from "react"

const signInContext = createContext();
const SignInProvider = ({children}) => {
    const [isSignIn, setIsSignIn] = useState(false);
  return (
    <signInContext.Provider value={{isSignIn,setIsSignIn}}>
        {children}
    </signInContext.Provider>
  )
}

export { signInContext, SignInProvider };