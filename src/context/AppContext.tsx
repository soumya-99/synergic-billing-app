import React, { createContext, useEffect, useRef, useState } from "react"
import { AppState, Alert } from "react-native"
import { loginStorage } from "../storage/appStorage"
import useReceiptSettings from "../hooks/api/useReceiptSettings"
import useLogin from "../hooks/api/useLogin"
import { ReceiptSettingsData } from "../models/api_types"

export const AppStore = createContext(null)

const AppContext = ({ children }) => {
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






  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }
      appState.current = nextAppState;

      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);

      if (appState.current === "background") {
        console.log("TRIGGERED && CLEARED STORES")
        loginStorage.clearAll()
        // receiptSettingsStorage.clearAll()

        setIsLogin(!isLogin)
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppStore.Provider value={{ isLogin, handleLogin, appStateVisible, receiptSettings }}>
      {children}
    </AppStore.Provider>
  )
}

export default AppContext
