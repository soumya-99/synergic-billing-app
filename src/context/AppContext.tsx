import React, { createContext, useState } from "react"
import { ToastAndroid } from "react-native"

import LOGIN_DATA from "../data/login_dummy_data.json"

export const AppStore = createContext(null)

const AppContext = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(() => false)

  // const login = (
  //   loginText: string,
  //   passwordText: string,
  //   setLoginText: (txt: string | (() => string)) => void,
  //   setPasswordText: (txt: string | (() => string)) => void,
  // ) => {
  //   if (
  //     LOGIN_DATA.username === loginText &&
  //     LOGIN_DATA.password === passwordText
  //   ) {
  //     setIsLogin(!isLogin)
  //   } else {
  //     ToastAndroid.showWithGravityAndOffset(
  //       "Invalid Credentials. Please try again.",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.CENTER,
  //       25,
  //       50,
  //     )
  //     setLoginText(() => "")
  //     setPasswordText(() => "")
  //   }
  // }

  // const logout = () => {
  //   setIsLogin(() => !isLogin)
  // }

  return (
    <AppStore.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AppStore.Provider>
  )
}

export default AppContext
