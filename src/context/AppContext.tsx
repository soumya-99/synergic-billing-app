import React, { createContext, useState } from "react"

export const AppStore = createContext(null)

const AppContext = ({ children }) => {

    const [isLogin, setIsLogin] = useState(() => false)

    const login = () => {
        setIsLogin(() => !isLogin)
    }

    const logout = () => {
        setIsLogin(() => !isLogin)
    }
    
    return (
        <AppStore.Provider value={{isLogin, login, logout}}>
            {children}
        </AppStore.Provider>
    )
}

export default AppContext;