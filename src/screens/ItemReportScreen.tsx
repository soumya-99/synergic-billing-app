import { StyleSheet, ScrollView, SafeAreaView, View, ToastAndroid, PixelRatio } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { DataTable, Searchbar, Text } from "react-native-paper"
import DatePicker from "react-native-date-picker"
import ButtonPaper from "../components/ButtonPaper"
import { useEffect, useState } from "react"
import normalize from "react-native-normalize"
import { formattedDate } from "../utils/dateFormatter"
import { loginStorage } from "../storage/appStorage"
import { CollectionReport, ItemReport, ItemsData } from "../models/api_types"
import SurfacePaper from "../components/SurfacePaper"
import { useBluetoothPrint } from "../hooks/printables/useBluetoothPrint"
import useCollectionReport from "../hooks/api/useCollectionReport"
import useItemReport from "../hooks/api/useItemReport"
import { useIsFocused } from "@react-navigation/native"
import useItems from "../hooks/api/useItems"
import ScrollableListContainer from "../components/ScrollableListContainer"
import ProductListSuggestion from "../components/ProductListSuggestion"

function ItemReportScreen() {
    const isFocused = useIsFocused()
    const theme = usePaperColorScheme()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { fetchItems } = useItems()
    const { fetchItemReport } = useItemReport()
    const { printItemReport } = useBluetoothPrint()

    const [search, setSearch] = useState<string>(() => "")
    const [filteredItems, setFilteredItems] = useState<ItemsData[]>(() => [])
    const [items, setItems] = useState<ItemsData[]>(() => [])
    const [productId, setProductId] = useState<number>(() => undefined)

    const [itemReport, setItemReport] = useState<ItemReport[]>(() => [])

    const [fromDate, setFromDate] = useState(() => new Date())
    const [toDate, setToDate] = useState(() => new Date())
    const [openFromDate, setOpenFromDate] = useState(() => false)
    const [openToDate, setOpenToDate] = useState(() => false)

    const formattedFromDate = formattedDate(fromDate)
    const formattedToDate = formattedDate(toDate)

    const handleGetItems = async () => {
        const companyId = loginStore.comp_id
        let itemsData = await fetchItems(companyId)

        setItems(itemsData)
    }

    useEffect(() => {
        handleGetItems()
    }, [isFocused])

    const onChangeSearch = (query: string) => {
        setSearch(query)

        const filtered = items.filter(item => item?.item_name?.includes(query))
        setFilteredItems(filtered)
        if (query === "") setFilteredItems(() => [])
    }

    const productDetails = (item: ItemsData) => {
        setProductId(item?.item_id)
        setSearch(() => "")
    }

    const handleGetItemReport = async (fromDate: string, toDate: string, companyId: number, branchId: number, productId: number, userId: string) => {
        await fetchItemReport(fromDate, toDate, companyId, branchId, productId, userId).then(res => {
            setItemReport(res?.data)
            console.log("XXXXXXXXXXXXXXXXX", res?.data)
        }).catch(err => {
            ToastAndroid.show("Error fetching item report.", ToastAndroid.SHORT)
        })
    }

    const handlePrint = (itemReport: ItemReport[]) => {
        if (itemReport.length !== 0) {
            printItemReport(itemReport)
        } else {
            ToastAndroid.show("No Report Found!", ToastAndroid.SHORT)
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
                        Item Report
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
                    <Searchbar
                        placeholder="Search Products"
                        onChangeText={onChangeSearch}
                        value={search}
                        elevation={search && 2}
                        // loading={search ? true : false}
                        autoFocus
                    />
                </View>

                <View style={{ paddingBottom: normalize(10) }}>
                    {search && (
                        <ScrollableListContainer
                            backgroundColor={theme.colors.surfaceVariant}>
                            {filteredItems.map(item => (
                                <ProductListSuggestion
                                    key={item?.id}
                                    itemName={item?.item_name}
                                    onPress={() => productDetails(item)}
                                    unitPrice={item?.price}
                                />
                            ))}
                        </ScrollableListContainer>
                    )}
                </View>

                <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
                    <ButtonPaper onPress={() => handleGetItemReport(formattedFromDate, formattedToDate, loginStore.comp_id, loginStore.br_id, productId, loginStore?.user_id)} mode="contained-tonal" buttonColor={theme.colors.green} textColor={theme.colors.onGreen}>
                        SUBMIT
                    </ButtonPaper>
                </View>


                <SurfacePaper backgroundColor={theme.colors.surface}>
                    <DataTable>

                        <DataTable.Header>
                            <DataTable.Title>Item</DataTable.Title>
                            <DataTable.Title>Pay Mode</DataTable.Title>
                            <DataTable.Title numeric>Qty.</DataTable.Title>
                            <DataTable.Title numeric>Price</DataTable.Title>
                            <DataTable.Title numeric>Amount</DataTable.Title>
                        </DataTable.Header>

                        {itemReport.map((item, i) => {
                            return (
                                <DataTable.Row key={i}>
                                    <DataTable.Cell>{item?.item_name}</DataTable.Cell>
                                    <DataTable.Cell>{item?.pay_mode === "C" ? "Cash" : item?.pay_mode === "U" ? "UPI" : item?.pay_mode === "D" ? "Card" : ""}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.qty}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.price}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.amount}</DataTable.Cell>
                                </DataTable.Row>
                            )
                        })}

                    </DataTable>
                </SurfacePaper>
                <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
                    <ButtonPaper icon={"cloud-print-outline"} onPress={() => handlePrint(itemReport)} mode="contained-tonal">
                        PRINT
                    </ButtonPaper>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ItemReportScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },

    title: {
        textAlign: "center",
    },
})
