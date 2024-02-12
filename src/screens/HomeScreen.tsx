import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  ToastAndroid,
  RefreshControl,
} from "react-native"
import React, { useCallback, useContext, useEffect, useState } from "react"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import { Button, List, Text } from "react-native-paper"
import { usePaperColorScheme } from "../theme/theme"
import HeaderImage from "../components/HeaderImage"
import { flowerHome, flowerHomeDark } from "../resources/images"
import navigationRoutes from "../routes/navigationRoutes"
import { CommonActions, useIsFocused, useNavigation } from "@react-navigation/native"
import SurfacePaper from "../components/SurfacePaper"
import DialogBox from "../components/DialogBox"
import normalize from "react-native-normalize"
import NetTotalButton from "../components/NetTotalButton"
import ScrollableListContainer from "../components/ScrollableListContainer"
import { loginStorage } from "../storage/appStorage"
import { ItemsData, RecentBillsData, ShowBillData } from "../models/api_types"
import { AppStore } from "../context/AppContext"
import useBillSummary from "../hooks/api/useBillSummary"
import useRecentBills from "../hooks/api/useRecentBills"
import useShowBill from "../hooks/api/useShowBill"
import AddedProductList from "../components/AddedProductList"
import NetTotalForRePrints from "../components/NetTotalForRePrints"

function HomeScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const { handleGetReceiptSettings, receiptSettings } = useContext(AppStore)

  const { fetchBillSummary } = useBillSummary()
  const { fetchRecentBills } = useRecentBills()
  const { fetchBill } = useShowBill()

  const loginStore = JSON.parse(loginStorage.getString("login-data"))

  const theme = usePaperColorScheme()
  const [isExtended, setIsExtended] = useState<boolean>(() => true)

  // const [addedProductsList, setAddedProductsList] = useState<ItemsData[]>(() => [])
  const [totalBills, setTotalBills] = useState<number | undefined>(() => undefined)
  const [amountCollected, setAmountCollected] = useState<number | undefined>(() => undefined)
  const [recentBills, setRecentBills] = useState<RecentBillsData[]>(() => [])
  const [billedSaleData, setBilledSaleData] = useState<ShowBillData[]>(() => [])

  const [refreshing, setRefreshing] = useState<boolean>(() => false)

  let today = new Date()
  let year = today.getFullYear()
  let month = ("0" + (today.getMonth() + 1)).slice(-2)
  let day = ("0" + today.getDate()).slice(-2)
  let formattedDate = year + "-" + month + "-" + day

  let netTotal = 0
  let totalDiscount = 0

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    handleGetReceiptSettings()
    handleGetBillSummary()
    handleGetRecentBills()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

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

  const handleGetBillSummary = async () => {
    await fetchBillSummary(formattedDate, loginStore.comp_id, loginStore.br_id, loginStore.user_id).then(res => {
      setTotalBills(res?.data[0]?.total_bills)
      setAmountCollected(res?.data[0]?.amount_collected)
    }).catch(err => {
      ToastAndroid.show("Check your internet connection or something went wrong in the server.", ToastAndroid.SHORT)
      console.log("handleGetBillSummary - HomeScreen", err, formattedDate)
    })
  }

  const handleGetRecentBills = async () => {
    let recentBillsData: RecentBillsData[] = await fetchRecentBills(formattedDate, loginStore.comp_id, loginStore.br_id, loginStore.user_id)
    setRecentBills(recentBillsData)
  }

  useEffect(() => {
    handleGetBillSummary()
    handleGetRecentBills()
  }, [isFocused])

  const handleGetBill = async (rcptNo: number) => {
    let bill = await fetchBill(rcptNo)

    setBilledSaleData(bill?.data)
  }

  const handleRecentBillListClick = (rcptNo: number) => {
    setVisible(!visible)
    handleGetBill(rcptNo)
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView onScroll={onScroll} keyboardShouldPersistTaps="handled" refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
                  <Text variant="titleLarge">{totalBills}</Text>
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
                  <Text variant="titleLarge">₹{amountCollected}</Text>
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
              {recentBills?.map((item, i) => (
                <List.Item
                  key={i}
                  title={`Bill ${item?.receipt_no}`}
                  description={`₹${item?.amount}`}
                  onPress={() => handleRecentBillListClick(item?.receipt_no)}
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
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: navigationRoutes.allBillsScreen,
                    })
                  )
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
          {billedSaleData?.map((item, i) => {
            netTotal += item.price * item.qty
            totalDiscount += parseFloat(item?.discount_amt?.toFixed(2))
            return (
              <AddedProductList
                disabled
                itemName={item.item_name}
                quantity={item.qty}
                // unit={item.unit}
                unitPrice={item.price}
                discount={receiptSettings?.discount_type === "P" ? item?.dis_pertg : item?.discount_amt}
                key={i}
              />
            )
          })}
        </ScrollableListContainer>
        {/* <NetTotalButton
          width={300}
          backgroundColor={theme.colors.orangeContainer}
          // addedProductsList={billedSaleData}
          netTotal={netTotal}
          textColor={theme.colors.onGreenContainer}
          totalDiscount={totalDiscount}
          disabled
        /> */}
        <NetTotalForRePrints
          width={300}
          backgroundColor={theme.colors.orangeContainer}
          addedProductsList={billedSaleData}
          netTotal={netTotal}
          textColor={theme.colors.onGreenContainer}
          totalDiscount={totalDiscount}
          disabled
        />
      </DialogBox>
      <AnimatedFABPaper
        icon="plus"
        label="Bill"
        onPress={() =>
          navigation.dispatch(
            CommonActions.navigate({
              name: navigationRoutes.productsScreen,
            })
          )}
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
