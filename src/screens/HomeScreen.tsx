import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  ToastAndroid,
} from "react-native"
import React, { useEffect, useState } from "react"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import { Button, Divider, List, Text } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import HeaderImage from "../components/HeaderImage"
import { flowerHome, flowerHomeDark } from "../resources/images"
import navigationRoutes from "../routes/navigationRoutes"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import SurfacePaper from "../components/SurfacePaper"
import DialogBox from "../components/DialogBox"
import normalize from "react-native-normalize"
import AddedProductList from "../components/AddedProductList"
import NetTotalButton from "../components/NetTotalButton"
import ScrollableListContainer from "../components/ScrollableListContainer"
import { loginStorage } from "../storage/appStorage"
import useReceiptSettings from "../hooks/api/useReceiptSettings"
import { ItemsData } from "../models/api_types"
import useItems from "../hooks/api/useItems"

// type ProductsDataObject = {
//   id: number
//   item: string
//   description: string
//   quantity: number
//   unit_price: number
//   unit: string
// }

function HomeScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  // const { fetchReceiptSettings } = useReceiptSettings()

  const loginStore = JSON.parse(loginStorage.getString("login-data"))

  const theme = usePaperColorScheme()
  const [isExtended, setIsExtended] = useState(() => true)

  const [addedProductsList, setAddedProductsList] = useState<ItemsData[]>(() => [])

  let netTotal = 0

  // const handleGetReceiptSettings = async () => {
  //   const companyId = loginStore.comp_id
  //   let receiptSettingsData = await fetchReceiptSettings(companyId)
  //   console.log("receiptSettingsData", receiptSettingsData[0])

  //   // receiptSettingsStorage.set("receipt-settings-store", JSON.stringify(receiptSettingsData[0]));
  // }

  // useEffect(() => {
  // handleGetReceiptSettings()
  // }, [isFocused])

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
            Welcome Back, {loginStore.company_name}!
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
        <ScrollableListContainer
          backgroundColor={theme.colors.surfaceVariant}
          height={250}
          width={300}>
          {/* {addedProductsList.map(item => {
            netTotal += item.unit_price * item.quantity
            return (
              <AddedProductList
                itemName={item.item}
                quantity={item.quantity}
                unit={item.unit}
                unitPrice={item.unit_price}
                discount={22}
                key={item.id}
              />
            )
          })} */}
        </ScrollableListContainer>
        <NetTotalButton
          width={300}
          backgroundColor={theme.colors.orangeContainer}
          netTotal={netTotal}
          textColor={theme.colors.onGreenContainer}
          totalDiscount={22}
          disabled
        />
        {/* <View
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
              width: normalize(320),
              height: "auto",
              alignSelf: "center",
              borderRadius: normalize(30),
              padding: normalize(10),
            }}>
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
        </View> */}
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
