import React, { createContext, useState } from 'react'

const preventOperateContext = createContext();
const PreventOperateProvider = ({children}) => {
    const [isPreventOperate, setIsPreventOperate] = useState(false);
  return (
    <preventOperateContext.Provider value={{isPreventOperate,setIsPreventOperate}}>
        {children}
    </preventOperateContext.Provider>
  )
}

export {preventOperateContext, PreventOperateProvider}