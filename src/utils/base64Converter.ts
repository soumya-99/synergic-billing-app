import RNFS from 'react-native-fs'


export const convertImageToBase64 = async (myImg) => {
    // const [base64Image, setBase64Image] = useState<string>(null)
    let base64String: string
    try {
        // Read the image file as base64
        return base64String = await RNFS.readFile(myImg, 'base64')
        // setBase64Image(base64String)
    } catch (error) {
        console.error('Error converting image to base64:', error)
    }
}