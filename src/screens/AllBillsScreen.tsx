import React, { useState } from "react"
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  ToastAndroid,
} from "react-native"
import { List, Searchbar } from "react-native-paper"
import HeaderImage from "../components/HeaderImage"
import { textureBill, textureBillDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { useNavigation } from "@react-navigation/native"
import DialogBox from "../components/DialogBox"
import AddedProductList from "../components/AddedProductList"
import ScrollableListContainer from "../components/ScrollableListContainer"
import NetTotalButton from "../components/NetTotalButton"
import ButtonPaper from "../components/ButtonPaper"
import DatePicker from "react-native-date-picker"
import normalize from "react-native-normalize"
import useSearchBills from "../hooks/api/useSearchBills"
import { loginStorage } from "../storage/appStorage"
import { SearchedBills, ShowBillData } from "../models/api_types"
import { formattedDate } from "../utils/dateFormatter"
import SurfacePaper from "../components/SurfacePaper"
import useShowBill from "../hooks/api/useShowBill"

type ProductsDataObject = {
  id: number
  item: string
  description: string
  quantity: number
  unit_price: number
  unit: string
}

function AllBillsScreen() {
  const theme = usePaperColorScheme()
  const navigation = useNavigation()

  const loginStore = JSON.parse(loginStorage.getString("login-data"))

  const [visible, setVisible] = useState(() => false)
  const hideDialog = () => setVisible(() => false)

  const [fromDate, setFromDate] = useState(() => new Date())
  const [toDate, setToDate] = useState(() => new Date())
  const [openFromDate, setOpenFromDate] = useState(() => false)
  const [openToDate, setOpenToDate] = useState(() => false)

  const formattedFromDate = formattedDate(fromDate)
  const formattedToDate = formattedDate(toDate)

  const [billsArray, setBillsArray] = useState<SearchedBills[]>(() => [])
  const [billedSaleData, setBilledSaleData] = useState<ShowBillData[]>(() => [])

  const { fetchSearchedBills } = useSearchBills()
  const { fetchBill } = useShowBill()

  const handleGetBill = async (rcptNo: number) => {
    let bill = await fetchBill(rcptNo)
    setBilledSaleData(bill?.data)
  }

  const handleBillListClick = (rcptNo: number) => {
    setVisible(!visible)
    handleGetBill(rcptNo)
  }

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

  const handleGetBillsByDate = async (fromDate: string, toDate: string) => {
    let billResponseData = await fetchSearchedBills(fromDate, toDate, loginStore.comp_id, loginStore.br_id, loginStore.user_id)
    setBillsArray(billResponseData?.data)
  }

  let netTotal = 0

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <HeaderImage
            imgLight={textureBill}
            imgDark={textureBillDark}
            borderRadius={30}
            blur={10}
            isBackEnabled
            navigation={navigation}>
            My Bills
          </HeaderImage>
        </View>

        <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <ButtonPaper onPress={() => setOpenFromDate(true)} mode="text">
            FROM: {fromDate?.toLocaleDateString("en-GB")}
          </ButtonPaper>
          <ButtonPaper onPress={() => setOpenToDate(true)} mode="text">
            TO: {toDate?.toLocaleDateString("en-GB")}
          </ButtonPaper>

          <DatePicker
            modal
            mode="date"
            // minimumDate={toDate.setMonth(toDate.getMonth() - 1)}
            open={openFromDate}
            date={fromDate}
            onConfirm={(date) => {
              setOpenFromDate(false)
              setFromDate(date)
            }}
            onCancel={() => {
              setOpenFromDate(false)
            }}
          />
          <DatePicker
            modal
            mode="date"
            open={openToDate}
            date={toDate}
            onConfirm={(date) => {
              setOpenToDate(false)
              setToDate(date)
            }}
            onCancel={() => {
              setOpenToDate(false)
            }}
          />
        </View>

        <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
          <ButtonPaper onPress={() => handleGetBillsByDate(formattedFromDate, formattedToDate)} mode="contained-tonal">
            SUBMIT
          </ButtonPaper>
        </View>

        <View style={{ width: "100%" }}>
          {billsArray?.map((item, i) => (
            <List.Item
              key={i}
              title={`Bill ${item?.receipt_no}`}
              description={`₹${item?.amount}`}
              onPress={() => handleBillListClick(item?.receipt_no)}
              left={props => <List.Icon {...props} icon="basket" />}
            // right={props => (
            //   <List.Icon {...props} icon="download" />
            // )}
            />
          ))}
        </View>
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
          width={300}
          height={200}>
          {billedSaleData.map((item, i) => {
            netTotal += item.price * item.qty
            return (
              <AddedProductList
                disabled
                itemName={item.item_name}
                quantity={item.qty}
                // unit={item.unit}
                unitPrice={item.price}
                discount={item?.discount_amt}
                key={i}
              />
            )
          })}
        </ScrollableListContainer>
        <NetTotalButton
          width={300}
          backgroundColor={theme.colors.orangeContainer}
          netTotal={netTotal}
          textColor={theme.colors.onGreenContainer}
          totalDiscount={4}
          disabled
        />
      </DialogBox>
    </SafeAreaView>
  )
}

export default AllBillsScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },
})
