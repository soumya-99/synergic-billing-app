import React, { createContext, useState } from "react"

export const AppStore = createContext(null)

const AppContext = ({ children }) => {

    const [isLogin, setIsLogin] = useState(() => false)
    
    return (
        <AppStore.Provider value={isLogin}>
            {children}
        </AppStore.Provider>
    )
}

export default AppContext;