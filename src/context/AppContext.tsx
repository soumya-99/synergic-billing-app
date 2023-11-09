import React, { createContext, useEffect, useMemo, useState } from "react"
import { ToastAndroid } from "react-native"

import data from "../data/login_dummy_data.json"

export const AppStore = createContext(null)

const AppContext = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => false)

    const login = (loginText: string, passwordText: string) => {
        if (data.username === loginText && data.password === passwordText) {
          setIsLogin(!isLogin)
        } else {
            ToastAndroid.showWithGravityAndOffset(
                "Invalid Credentials. Please try again.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                25,
                50,
          )
        }
    }

    const logout = () => {
        setIsLogin(() => !isLogin)
    }
    
    return (
        <AppStore.Provider value={{ isLogin, login, logout }}>
            {children}
        </AppStore.Provider>
    )
}

export default AppContext;