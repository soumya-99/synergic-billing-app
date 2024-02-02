import React, { createContext, useState } from "react"

export const AppStore = createContext(null)

const AppContext = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(() => false)

  return (
    <AppStore.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AppStore.Provider>
  )
}

export default AppContext
