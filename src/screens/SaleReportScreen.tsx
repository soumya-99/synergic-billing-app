import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { DataTable, Text } from "react-native-paper"
import useSaleReport from "../hooks/api/useSaleReport"
import DatePicker from "react-native-date-picker"
import ButtonPaper from "../components/ButtonPaper"
import { useState } from "react"
import normalize from "react-native-normalize"
import { formattedDate } from "../utils/dateFormatter"
import { loginStorage } from "../storage/appStorage"
import { SaleReport } from "../models/api_types"
import SurfacePaper from "../components/SurfacePaper"

function SaleReportScreen() {
  const theme = usePaperColorScheme()

  const loginStore = JSON.parse(loginStorage.getString("login-data"))

  const { fetchSaleReport } = useSaleReport()

  const [saleReport, setSaleReport] = useState<SaleReport[]>(() => [])

  const [fromDate, setFromDate] = useState(() => new Date())
  const [toDate, setToDate] = useState(() => new Date())
  const [openFromDate, setOpenFromDate] = useState(() => false)
  const [openToDate, setOpenToDate] = useState(() => false)

  const formattedFromDate = formattedDate(fromDate)
  const formattedToDate = formattedDate(toDate)

  const handleGetSaleReport = async (fromDate: string, toDate: string, companyId: number, branchId: number) => {
    let saleResponse = await fetchSaleReport(fromDate, toDate, companyId, branchId)

    setSaleReport(saleResponse?.data)
    console.log("DDDDDDDDDDDDDDD", saleResponse?.data)
  }

  return (
    <SafeAreaView style={styles.container}>
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
          <ButtonPaper onPress={() => handleGetSaleReport(formattedFromDate, formattedToDate, loginStore.comp_id, loginStore.br_id)} mode="contained-tonal" buttonColor={theme.colors.green} textColor={theme.colors.onGreen}>
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
              <DataTable.Title numeric>GST</DataTable.Title>
              <DataTable.Title numeric>Dis.</DataTable.Title>
              <DataTable.Title numeric>Total Amt.</DataTable.Title>
            </DataTable.Header>

            {saleReport.map((item) => {
              let totalGST: number = 0

              totalGST += item?.cgst_amt + item?.sgst_amt

              return (<DataTable.Row key={item?.receipt_no}>
                {/* <DataTable.Cell>{item?.cust_name}</DataTable.Cell>
              <DataTable.Cell>{item?.phone_no}</DataTable.Cell> */}
                {/* <DataTable.Cell>{new Date(item?.trn_date).toLocaleDateString("en-GB")}</DataTable.Cell> */}
                <DataTable.Cell>{item?.receipt_no}</DataTable.Cell>
                <DataTable.Cell numeric>{item?.no_of_items}</DataTable.Cell>
                <DataTable.Cell numeric>{item?.price}</DataTable.Cell>
                <DataTable.Cell numeric>{totalGST}</DataTable.Cell>
                <DataTable.Cell numeric>{item?.discount_amt}</DataTable.Cell>
                <DataTable.Cell numeric>{item?.net_amt + item?.rount_off}</DataTable.Cell>
              </DataTable.Row>)
            })}

          </DataTable>
        </SurfacePaper>
        <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
          <ButtonPaper icon={"cloud-print-outline"} onPress={() => console.log("sagfsdffasd")} mode="contained-tonal">
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
