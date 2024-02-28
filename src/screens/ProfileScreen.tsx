import { View, ScrollView, StyleSheet, PixelRatio, ToastAndroid } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Switch, Text } from "react-native-paper"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import HeaderImage from "../components/HeaderImage"
import { flowerHome, flowerHomeDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import DialogBox from "../components/DialogBox"
import InputPaper from "../components/InputPaper"
import { loginStorage } from "../storage/appStorage"
import { AppStore } from "../context/AppContext"
import useEditHeaderFooter from "../hooks/api/useEditHeaderFooter"
import { useIsFocused } from "@react-navigation/native"

export default function ProfileScreen() {
    const isFocused = useIsFocused()
    const theme = usePaperColorScheme()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))
    const { receiptSettings, handleGetReceiptSettings } = useContext(AppStore)

    return (
        <SafeAreaView style={[{ backgroundColor: theme.colors.background, height: "100%" }]}>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <HeaderImage
                        isBackEnabled
                        imgLight={flowerHome}
                        imgDark={flowerHomeDark}
                        borderRadius={30}
                        blur={10}>
                        My Profile
                    </HeaderImage>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
