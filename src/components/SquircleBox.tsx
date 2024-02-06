import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React, { PropsWithChildren } from 'react'
import normalize from 'react-native-normalize'

type SquircleBoxProps = {
    backgroundColor: string
    textColor: string
    height?: number | "auto"
    width?: number
}

const SquircleBox = ({
    backgroundColor,
    textColor,
    width = 320,
    height = "auto",
    children
}: PropsWithChildren<SquircleBoxProps>) => {
    return (
        <View style={{
            width: normalize(width),
            minHeight: height,
            height: "auto",
            backgroundColor: backgroundColor,
            alignSelf: "center",
            borderRadius: normalize(30),
            marginTop: normalize(15),
            padding: normalize(20),
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={{ color: textColor, textAlign: "center", fontWeight: "700" }} variant="bodyLarge">{children}</Text>
        </View>
    )
}

export default SquircleBox
