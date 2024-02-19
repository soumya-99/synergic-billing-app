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
import { CollectionReport } from "../models/api_types"
import SurfacePaper from "../components/SurfacePaper"
import { useBluetoothPrint } from "../hooks/printables/useBluetoothPrint"
import useCollectionReport from "../hooks/api/useCollectionReport"

function CollectionReportScreen() {
    const theme = usePaperColorScheme()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { fetchCollectionReport } = useCollectionReport()
    const { printCollectionReport } = useBluetoothPrint()

    const [collectionReport, setCollectionReport] = useState<CollectionReport[]>(() => [])

    const [fromDate, setFromDate] = useState(() => new Date())
    const [toDate, setToDate] = useState(() => new Date())
    const [openFromDate, setOpenFromDate] = useState(() => false)
    const [openToDate, setOpenToDate] = useState(() => false)

    const formattedFromDate = formattedDate(fromDate)
    const formattedToDate = formattedDate(toDate)

    const handleGetCollectionReport = async (fromDate: string, toDate: string, companyId: number, branchId: number) => {
        await fetchCollectionReport(fromDate, toDate, companyId, branchId).then(res => {
            setCollectionReport(res?.data)
            console.log("XXXXXXXXXXXXXXXXX", res?.data)
        }).catch(err => {
            ToastAndroid.show("Error during fetching report.", ToastAndroid.SHORT)
        })
    }

    const handlePrint = (collectionReport: CollectionReport[], fromDate: string, toDate: string) => {
        if (collectionReport.length !== 0) {
            printCollectionReport(collectionReport, fromDate, toDate)
        } else {
            ToastAndroid.show("Something went wrong in Collection Report!", ToastAndroid.SHORT)
            return
        }
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
                        Collection Report
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
                            <DataTable.Title>Created By</DataTable.Title>
                            <DataTable.Title>Pay Mode</DataTable.Title>
                            <DataTable.Title numeric>Net Amount</DataTable.Title>
                        </DataTable.Header>

                        {collectionReport?.map((item, i) => {
                            return (
                                <DataTable.Row key={i}>
                                    <DataTable.Cell>{item?.created_by}</DataTable.Cell>
                                    <DataTable.Cell>{item?.pay_mode === "C" ? "Cash" : item?.pay_mode === "U" ? "UPI" : item?.pay_mode === "D" ? "Card" : ""}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.net_amt}</DataTable.Cell>
                                </DataTable.Row>
                            )
                        })}

                    </DataTable>
                </SurfacePaper>
                <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
                    <ButtonPaper icon={"cloud-print-outline"} onPress={() => handlePrint(collectionReport, formattedFromDate, formattedToDate)} mode="contained-tonal">
                        PRINT
                    </ButtonPaper>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CollectionReportScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },

    title: {
        textAlign: "center",
    },
})
