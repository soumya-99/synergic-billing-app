import { StyleSheet, ScrollView, SafeAreaView, View, ToastAndroid } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { DataTable, Text } from "react-native-paper"
import useSaleReport from "../hooks/api/useSaleReport"
import DatePicker from "react-native-date-picker"
import ButtonPaper from "../components/ButtonPaper"
import { useContext, useState } from "react"
import normalize from "react-native-normalize"
import { formattedDate } from "../utils/dateFormatter"
import { loginStorage } from "../storage/appStorage"
import { SaleReport } from "../models/api_types"
import SurfacePaper from "../components/SurfacePaper"
import { useBluetoothPrint } from "../hooks/printables/useBluetoothPrint"
import { AppStore } from "../context/AppContext"

function SaleReportScreen() {
  const theme = usePaperColorScheme()

  const loginStore = JSON.parse(loginStorage.getString("login-data"))

  const { receiptSettings } = useContext(AppStore)

  const { fetchSaleReport } = useSaleReport()
  const { printSaleReport } = useBluetoothPrint()

  const [saleReport, setSaleReport] = useState<SaleReport[]>(() => [])

  const [fromDate, setFromDate] = useState(() => new Date())
  const [toDate, setToDate] = useState(() => new Date())
  const [openFromDate, setOpenFromDate] = useState(() => false)
  const [openToDate, setOpenToDate] = useState(() => false)

  const formattedFromDate = formattedDate(fromDate)
  const formattedToDate = formattedDate(toDate)

  const handleGetSaleReport = async (fromDate: string, toDate: string, companyId: number, branchId: number, userId: string) => {
    await fetchSaleReport(fromDate, toDate, companyId, branchId, userId).then(res => {
      setSaleReport(res?.data)
      console.log("DDDDDDDDDDDDDDD", res?.data)
    }).catch(err => {
      ToastAndroid.show("Error fetching sale report.", ToastAndroid.SHORT)
    })
  }

  const handlePrint = (saleReport: SaleReport[], fromDate: string, toDate: string) => {
    if (saleReport.length !== 0) {
      printSaleReport(saleReport, fromDate, toDate)
    } else {
      ToastAndroid.show("No Sale Report Found!", ToastAndroid.SHORT)
      return
    }
  }

  let totalNetAmount: number = 0

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
            Sale Report
          </HeaderImage>
        </View>
        <View style={{ padding: normalize(10), flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <ButtonPaper textColor={theme.colors.green} onPress={() => setOpenFromDate(true)} mode="text">
            FROM: {fromDate?.toLocaleDateString("en-GB")}
          </ButtonPaper>
          <ButtonPaper textColor={theme.colors.green} onPress={() => setOpenToDate(true)} mode="text">
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
          <ButtonPaper onPress={() => handleGetSaleReport(formattedFromDate, formattedToDate, loginStore.comp_id, loginStore.br_id, loginStore?.user_id)} mode="contained-tonal" buttonColor={theme.colors.green} textColor={theme.colors.onGreen}>
            SUBMIT
          </ButtonPaper>
        </View>


        <SurfacePaper backgroundColor={theme.colors.surface}>
          <DataTable>

            <DataTable.Header>
              {/* <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Phone</DataTable.Title> */}
              {/* <DataTable.Title>Tnx. Date</DataTable.Title> */}
              <DataTable.Title>Rcpt. No.</DataTable.Title>
              <DataTable.Title numeric>Qty.</DataTable.Title>
              <DataTable.Title numeric>Price</DataTable.Title>
              {receiptSettings?.gst_flag === "Y" && (
                <DataTable.Title numeric>GST</DataTable.Title>
              )}
              <DataTable.Title numeric>Dis.</DataTable.Title>
              <DataTable.Title numeric>Total Amt.</DataTable.Title>
            </DataTable.Header>

            {saleReport.map((item) => {
              let totalGST: number = 0

              totalGST += item?.cgst_amt + item?.sgst_amt
              totalNetAmount += item?.net_amt

              return (<DataTable.Row key={item?.receipt_no}>
                {/* <DataTable.Cell>{item?.cust_name}</DataTable.Cell>
              <DataTable.Cell>{item?.phone_no}</DataTable.Cell> */}
                {/* <DataTable.Cell>{new Date(item?.trn_date).toLocaleDateString("en-GB")}</DataTable.Cell> */}
                <DataTable.Cell>{item?.receipt_no?.toString()?.substring(item?.receipt_no?.toString()?.length - 4)}</DataTable.Cell>
                <DataTable.Cell numeric>{item?.no_of_items}</DataTable.Cell>
                <DataTable.Cell numeric>{item?.price}</DataTable.Cell>
                {receiptSettings?.gst_flag === "Y" && (
                  <DataTable.Cell numeric>{totalGST}</DataTable.Cell>
                )}
                <DataTable.Cell numeric>{item?.discount_amt}</DataTable.Cell>
                <DataTable.Cell numeric>{item?.net_amt}</DataTable.Cell>
              </DataTable.Row>)
            })}

          </DataTable>
          <View style={{ padding: normalize(10) }}>
            <Text variant="labelMedium" style={{ color: theme.colors.green }}>TOTAL: {totalNetAmount?.toFixed(2)}</Text>
          </View>
        </SurfacePaper>
        <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
          <ButtonPaper icon={"cloud-print-outline"} onPress={() => handlePrint(saleReport, formattedFromDate, formattedToDate)} mode="contained-tonal">
            PRINT
          </ButtonPaper>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SaleReportScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: "center",
  },
})
