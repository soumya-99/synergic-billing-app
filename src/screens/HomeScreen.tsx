import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  PixelRatio,
} from "react-native"
import { useState } from "react"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import { Button, List, Surface, Text } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import HeaderImage from "../components/HeaderImage"
import { flowerHome, flowerHomeDark } from "../resources/images"
import navigationRoutes from "../routes/navigationRoutes"
import { useNavigation } from "@react-navigation/native"
import SurfacePaper from "../components/SurfacePaper"

function HomeScreen() {
  const navigation = useNavigation()
  const theme = usePaperColorScheme()
  const [isExtended, setIsExtended] = useState(() => true)

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0

    setIsExtended(currentScrollPosition <= 0)
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView onScroll={onScroll} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: "center" }}>
          <HeaderImage
            imgLight={flowerHome}
            imgDark={flowerHomeDark}
            borderRadius={30}
            blur={10}>
            Welcome Back, Shop Name!
          </HeaderImage>
        </View>

        <View style={{ alignItems: "center" }}>
          <SurfacePaper
            heading="Summary"
            elevation={2}
            backgroundColor={theme.colors.surfaceVariant}>
            <View style={{ width: "100%", margin: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View>
                  <Text>No. of Bills</Text>
                </View>
                <View>
                  <Text>50</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View>
                  <Text>Amount Collected</Text>
                </View>
                <View>
                  <Text>₹14000</Text>
                </View>
              </View>
            </View>
          </SurfacePaper>

          <SurfacePaper
            heading="Recent Bills"
            elevation={2}
            backgroundColor={theme.colors.pinkContainer}>
            <View style={{ width: "100%" }}>
              {[...new Array(4).keys()].map((_, i) => (
                <List.Item
                  key={i}
                  title={`Bill ${i + 1}`}
                  description={"Cadbury, Oil, Daal..."}
                  onPress={() => console.log(`Bill ${i + 1} clicked.`)}
                  left={props => <List.Icon {...props} icon="basket" />}
                  // right={props => (
                  //   <List.Icon {...props} icon="download" />
                  // )}
                />
              ))}
            </View>
            <View>
              <Button
                textColor={theme.colors.onPinkContainer}
                onPress={() =>
                  //@ts-ignore
                  navigation.navigate(navigationRoutes.allBillsScreen)
                }>
                All Bills
              </Button>
            </View>
          </SurfacePaper>
        </View>

        {/* {[...new Array(100).keys()].map((_, i) => (
          <Text key={i}>{i}</Text>
        ))} */}
      </ScrollView>
      <AnimatedFABPaper
        icon="plus"
        label="Bill"
        //@ts-ignore
        onPress={() => navigation.navigate(navigationRoutes.productsScreen)}
        extended={isExtended}
        animateFrom="right"
        iconMode="dynamic"
        customStyle={styles.fabStyle}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },

  bill: {
    margin: 20,
    padding: 10,
    // minHeight: 200,
    height: "auto",
    maxHeight: "auto",
    borderRadius: 30,
    width: 320,
    alignItems: "center",
  },

  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
})
