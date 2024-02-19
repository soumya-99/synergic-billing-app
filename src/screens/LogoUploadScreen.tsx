import { StyleSheet, ScrollView, SafeAreaView, View, ImageBackground, Image, ToastAndroid } from "react-native"
import { ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { fileStorage } from "../storage/appStorage"
import { useState } from "react"
import ButtonPaper from "../components/ButtonPaper";
import normalize from "react-native-normalize";

function LogoUploadScreen() {
    const theme = usePaperColorScheme()
    // const fileStore = fileStorage.getString("file-data")

    // fileStorage.set("file-data", JSON.stringify(loginData?.msg))

    // const [imageSource, setImageSource] = useState<string>()
    const [imgSrcUri, setImgSrcUri] = useState<string>()

    const selectLogo = () => {
        const options: ImageLibraryOptions = {
            mediaType: "photo",
            includeBase64: true
        }

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
                fileStorage.clearAll()
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage)
                fileStorage.clearAll()
            } else {
                const fileStore = fileStorage.getString("file-data")
                const fileStoreUri = fileStorage.getString("file-uri")

                if (fileStore?.length || fileStoreUri?.length > 0) {
                    fileStorage.clearAll()
                }

                const source = response?.assets[0]?.base64
                const srcUri = response?.assets[0]?.uri
                // const fileSize = response?.assets[0]?.fileSize

                setImgSrcUri(srcUri)
                // setImageSource(source)
                // console.log("aiuwerosdgogfuirsyildfufsdrfsdf", imageSource)
                fileStorage.set("file-data", source?.toString())
                fileStorage.set("file-uri", srcUri?.toString())

                console.log("ashdguasydguasdguyasdasd", fileStore)
                console.log("ashdguasydguasdgufddstgdtgrgdfgdfgdffyasdasd", imgSrcUri)
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

                <View style={{ padding: normalize(20) }}>
                    <ButtonPaper mode="contained" onPress={selectLogo}>
                        UPLOAD
                    </ButtonPaper>
                </View>

                <View style={{ padding: 20 }}>
                    {/* {imgSrcUri && ( */}
                    <Image
                        style={styles.image}
                        // source={{ uri: imgSrcUri }}
                        source={{ uri: fileStorage.getString("file-uri") === undefined ? imgSrcUri : fileStorage.getString("file-uri") }}
                    // resizeMode="contain"
                    />
                    {/* )} */}
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

    image: {
        width: '100%',
        height: normalize(300),
        marginVertical: 10,
        borderWidth: 1
    },
})
