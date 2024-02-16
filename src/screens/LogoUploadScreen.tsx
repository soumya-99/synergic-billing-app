import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"
import { ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { fileStorage, loginStorage } from "../storage/appStorage"
import { useState } from "react"
import ButtonPaper from "../components/ButtonPaper";

function LogoUploadScreen() {
    const theme = usePaperColorScheme()
    const fileStore = fileStorage.getString("file-data")
    // fileStorage.set("file-data", JSON.stringify(loginData?.msg))

    const [imageSource, setImageSource] = useState<string>(null)

    const selectLogo = () => {
        const options: ImageLibraryOptions = {
            mediaType: "photo",
            includeBase64: true
        }

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage)
            } else {
                const source = response.assets[0].base64
                setImageSource(source)
                console.log("aiuwerosdgogfuirsyildfufsdrfsdf", imageSource)
                fileStorage.set("file-data", imageSource.toString())

                console.log("ashdguasydguasdguyasdasd", fileStore)
            }
        })

    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: "center" }}>
                    <HeaderImage
                        isBackEnabled
                        imgLight={blurReport}
                        imgDark={blurReportDark}
                        borderRadius={30}
                        blur={10}>
                        Logo Upload
                    </HeaderImage>
                </View>

                <View>
                    <ButtonPaper mode="contained" onPress={selectLogo}>
                        UPLOAD
                    </ButtonPaper>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LogoUploadScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },

    title: {
        textAlign: "center",
    },
})
