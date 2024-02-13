import { StyleSheet, ScrollView, SafeAreaView, View, ToastAndroid } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { DataTable, Text } from "react-native-paper"
import DatePicker from "react-native-date-picker"
import ButtonPaper from "../components/ButtonPaper"
import { useState } from "react"
import normalize from "react-native-normalize"
import { formattedDate } from "../utils/dateFormatter"
import { loginStorage } from "../storage/appStorage"
import { GstStatement, GstSummary } from "../models/api_types"
import SurfacePaper from "../components/SurfacePaper"
import { useBluetoothPrint } from "../hooks/printables/useBluetoothPrint"
import useGstStatementReport from "../hooks/api/useGstStatementReport"
import useGstSummary from "../hooks/api/useGstSummaryReport"
import useGstSummaryReport from "../hooks/api/useGstSummaryReport"

function GstSummaryReportScreen() {
    const theme = usePaperColorScheme()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { fetchGstSummary } = useGstSummaryReport()
    const { printGstSummary } = useBluetoothPrint()

    const [gstStatement, setGstStatement] = useState<GstSummary[]>(() => [])

    const [fromDate, setFromDate] = useState(() => new Date())
    const [toDate, setToDate] = useState(() => new Date())
    const [openFromDate, setOpenFromDate] = useState(() => false)
    const [openToDate, setOpenToDate] = useState(() => false)

    const formattedFromDate = formattedDate(fromDate)
    const formattedToDate = formattedDate(toDate)

    const handleGetCollectionReport = async (fromDate: string, toDate: string, companyId: number, branchId: number) => {
        let gstSummaryResponse = await fetchGstSummary(fromDate, toDate, companyId, branchId)

        setGstStatement(gstSummaryResponse?.data)
        console.log("LLLLLLLLLLLLLLLL", gstSummaryResponse?.data)
    }

    const handlePrint = (gstSummaryReport: GstSummary[]) => {
        if (gstSummaryReport.length !== 0) {
            printGstSummary(gstSummaryReport)
        } else {
            ToastAndroid.show("Something went wrong in GST Statement Report!", ToastAndroid.SHORT)
            return
        }
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
                        GST Summary
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
                    <ButtonPaper onPress={() => handleGetCollectionReport(formattedFromDate, formattedToDate, loginStore.comp_id, loginStore.br_id)} mode="contained-tonal" buttonColor={theme.colors.green} textColor={theme.colors.onGreen}>
                        SUBMIT
                    </ButtonPaper>
                </View>


                <SurfacePaper backgroundColor={theme.colors.surface}>
                    <DataTable>

                        <DataTable.Header>
                            <DataTable.Title numeric>CGST (%)</DataTable.Title>
                            <DataTable.Title numeric>CGST Amt.</DataTable.Title>
                            <DataTable.Title numeric>SGST Amt.</DataTable.Title>
                            <DataTable.Title numeric>Total Tax</DataTable.Title>
                        </DataTable.Header>

                        {gstStatement.map((item, i) => {
                            return (
                                <DataTable.Row key={i}>
                                    <DataTable.Cell numeric>{item?.cgst_prtg}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.cgst_amt}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.sgst_amt}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.total_tax}</DataTable.Cell>
                                </DataTable.Row>
                            )
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

export default GstSummaryReportScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },

    title: {
        textAlign: "center",
    },
})
