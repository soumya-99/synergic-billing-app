import React, { createContext, useEffect, useRef, useState } from "react"
import { AppState, Alert } from "react-native"
import { loginStorage } from "../storage/appStorage"
import useReceiptSettings from "../hooks/api/useReceiptSettings"
import useLogin from "../hooks/api/useLogin"
import { ReceiptSettingsData } from "../models/api_types"

export const AppStore = createContext(null)

const AppContext = ({ children }) => {
  const appState = useRef(AppState.currentState);

  const [isLogin, setIsLogin] = useState<boolean>(() => false)
  const [receiptSettings, setReceiptSettings] = useState<ReceiptSettingsData>()

  const { login } = useLogin()
  const { fetchReceiptSettings } = useReceiptSettings()

  const handleLogin = async (loginText: string, passwordText: string) => {
    let loginData = await login(loginText, passwordText)
    console.log("loginData", loginData)

    if (loginData?.suc === 0) {
      Alert.alert("Error", "Login credentials are wrong! Please try again.")
      setIsLogin(false)
      return
    }
    if (loginData?.suc === 1) {
      loginStorage.set("login-data", JSON.stringify(loginData?.msg));
    }
    setIsLogin(true)
  }

  const isLoggedIn = () => {
    if (loginStorage.getAllKeys().length === 0) {
      console.log("IF - isLoggedIn");
      setIsLogin(isLogin);
    } else {
      console.log("ELSE - isLoggedIn");
      setIsLogin(!isLogin);
    }
  };

  useEffect(() => {
    if (appState.current === "active") {
      isLoggedIn()
    }
  }, []);

  const handleGetReceiptSettings = async () => {
    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const companyId = loginStore.comp_id
    let receiptSettingsData = await fetchReceiptSettings(companyId)
    console.log("receiptSettingsData", receiptSettingsData)

    setReceiptSettings(receiptSettingsData[0])
  }

  useEffect(() => {
    if (isLogin) {
      handleGetReceiptSettings()
    }
  }, [isLogin])

  const handleLogout = () => {
    loginStorage.clearAll();
    setIsLogin(!isLogin)
  }

  return (
    <AppStore.Provider value={{ isLogin, handleLogin, handleLogout, receiptSettings }}>
      {children}
    </AppStore.Provider>
  )
}

export default AppContext
