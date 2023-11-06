import React, { createContext, useEffect, useMemo, useState } from "react"

export const AppStore = createContext(null)

const AppContext = ({ children }) => {
    // const [username, setUsername] = useState(() => "")
    // const [password, setPassword] = useState(() => "")

    const [isLogin, setIsLogin] = useState(() => false)

    // const login = () => {
        
    //     setIsLogin(() => !isLogin)
    // }

    const logout = () => {
        setIsLogin(() => !isLogin)
    }
    
    return (
        <AppStore.Provider value={{isLogin, setIsLogin, logout}}>
            {children}
        </AppStore.Provider>
    )
}

export default AppContext;