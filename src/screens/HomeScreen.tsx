import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  ToastAndroid,
} from "react-native"
import React, { useState } from "react"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import { Button, Divider, List, Text } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import HeaderImage from "../components/HeaderImage"
import { flowerHome, flowerHomeDark } from "../resources/images"
import navigationRoutes from "../routes/navigationRoutes"
import { useNavigation } from "@react-navigation/native"
import SurfacePaper from "../components/SurfacePaper"
import DialogBox from "../components/DialogBox"
import normalize from "react-native-normalize"

type ProductsDataObject = {
  id: number
  item: string
  description: string
  quantity: number
  unit_price: number
}

function HomeScreen() {
  const navigation = useNavigation()
  const theme = usePaperColorScheme()
  const [isExtended, setIsExtended] = useState(() => true)

  const [addedProductsList, setAddedProductsList] = useState<
    ProductsDataObject[]
  >(() => [
    {
      id: 1,
      item: "Emami Rice Bran Oil",
      description: "Item description",
      unit_price: 240,
      quantity: 2,
    },
    {
      id: 2,
      item: "Lux Soap",
      description: "Item description",
      unit_price: 65,
      quantity: 9,
    },
    {
      id: 3,
      item: "Mung Daal",
      description: "Item description",
      unit_price: 160,
      quantity: 12,
    },
    {
      id: 4,
      item: "Cadbury Dairy Milk",
      description: "Item description",
      unit_price: 110,
      quantity: 7,
    },
    {
      id: 9,
      item: "Cadbury Dairy Milk",
      description: "Item description",
      unit_price: 110,
      quantity: 7,
    },
    {
      id: 78,
      item: "Cadbury Dairy Milk",
      description: "Item description",
      unit_price: 110,
      quantity: 7,
    },
    {
      id: 23,
      item: "Cadbury Dairy Milk",
      description: "Item description",
      unit_price: 110,
      quantity: 7,
    },
  ])

  let netTotal = 0

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0

    setIsExtended(currentScrollPosition <= 0)
  }

  const [visible, setVisible] = useState(() => false)
  const hideDialog = () => setVisible(() => false)

  const onDialogFailure = () => {
    setVisible(!visible)
  }

  const onDialogSuccecss = () => {
    setVisible(!visible)
    ToastAndroid.showWithGravityAndOffset(
      "Printing feature will be added in some days.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
      25,
      50,
    )
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
            Welcome Back, Kalinga Store!
          </HeaderImage>
        </View>

        <View style={{ alignItems: "center" }}>
          <SurfacePaper
            // heading="Summary"
            elevation={2}
            backgroundColor={theme.colors.surfaceVariant}>
            <View style={{ width: "100%", padding: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View>
                  <Text variant="titleLarge">Total Bills</Text>
                </View>
                <View>
                  <Text variant="titleLarge">50</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View>
                  <Text variant="titleLarge">Amount Collected</Text>
                </View>
                <View>
                  <Text variant="titleLarge">₹14000</Text>
                </View>
              </View>
            </View>
          </SurfacePaper>

          <SurfacePaper
            isBorderEnabled
            heading="Recent Bills"
            elevation={2}
            backgroundColor={theme.colors.pinkContainer}>
            <View style={{ width: "100%" }}>
              {[...new Array(4).keys()].map((_, i) => (
                <List.Item
                  key={i}
                  title={`Bill ${i + 1}`}
                  description={"Cadbury, Oil, Daal..."}
                  onPress={() => setVisible(!visible)}
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
                ALL BILLS
              </Button>
            </View>
          </SurfacePaper>
        </View>

        {/* {[...new Array(100).keys()].map((_, i) => (
          <Text key={i}>{i}</Text>
        ))} */}
      </ScrollView>
      <DialogBox
        iconSize={40}
        visible={visible}
        hide={hideDialog}
        titleStyle={styles.title}
        btnSuccess="REPRINT"
        onFailure={onDialogFailure}
        onSuccess={onDialogSuccecss}
        title="Print Bill"
        icon="printer-outline">
        <ScrollView
          style={{
            width: normalize(300),
            height: normalize(250),
            backgroundColor: theme.colors.surfaceVariant,
            alignSelf: "center",
            borderRadius: normalize(30),
          }}
          nestedScrollEnabled={true}>
          {/* <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}>
            <View>
              <Text variant="labelMedium">Product ID:</Text>
            </View>
          </View> */}
          {addedProductsList.map(item => {
            netTotal += item.unit_price * item.quantity
            return (
              <React.Fragment key={item.id}>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: "space-between",
                    margin: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <View>
                      <Text>{item.item}</Text>
                    </View>
                    <View>
                      <Text>₹{item.unit_price}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <View>
                      <Text>Discount:</Text>
                    </View>
                    <View>
                      <Text>₹{2}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <View>
                      <Text>QTY: {item.quantity}</Text>
                    </View>
                    <View>
                      <Text>TOTAL: ₹{item.unit_price * item.quantity - 2}</Text>
                    </View>
                  </View>
                </View>
                <Divider />
              </React.Fragment>
            )
          })}
        </ScrollView>
        <View
          style={{
            width: normalize(300),
            height: "auto",
            backgroundColor: theme.colors.orangeContainer,
            alignSelf: "center",
            borderRadius: normalize(30),
            marginTop: normalize(15),
          }}>
          <View
            style={{
              // margin: 15,
              // justifyContent: "space-between",
              // alignItems: "center",
              // flexDirection: "row",
              // flex: 1,
              width: normalize(320),
              height: "auto",
              // backgroundColor: theme.colors.greenContainer,
              alignSelf: "center",
              borderRadius: normalize(30),
              padding: normalize(10),
            }}>
            <View
              style={
                {
                  // flex: 1,
                  // width: normalize(320),
                  // height: "auto",
                  // backgroundColor: theme.colors.greenContainer,
                  // alignSelf: "center",
                  // borderRadius: normalize(30),
                  // marginTop: normalize(15),
                }
              }>
              <View
                style={{
                  margin: normalize(15),
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}>
                <View>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    TOTAL AMOUNT
                  </Text>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    DISCOUNT
                  </Text>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    CGST
                  </Text>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    SGST
                  </Text>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    NET AMOUNT
                  </Text>
                </View>
                <View>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    ₹{netTotal}
                  </Text>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    ₹{2}
                  </Text>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    9%
                  </Text>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    9%
                  </Text>
                  <Text style={{ color: theme.colors.onGreenContainer }}>
                    ₹{6174}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </DialogBox>
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
    margin: normalize(20),
    padding: normalize(10),
    // minHeight: 200,
    height: "auto",
    maxHeight: "auto",
    borderRadius: normalize(30),
    width: normalize(320),
    alignItems: "center",
  },

  fabStyle: {
    bottom: normalize(16),
    right: normalize(16),
    position: "absolute",
  },
})
