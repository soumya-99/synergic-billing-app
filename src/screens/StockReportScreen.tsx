import { StyleSheet, ScrollView, SafeAreaView, View, ToastAndroid } from "react-native"

import HeaderImage from "../components/HeaderImage"
import { blurReport, blurReportDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { DataTable, Searchbar, Text } from "react-native-paper"
import ButtonPaper from "../components/ButtonPaper"
import { useEffect, useState } from "react"
import normalize from "react-native-normalize"
import { loginStorage } from "../storage/appStorage"
import { ItemReport, ItemsData } from "../models/api_types"
import SurfacePaper from "../components/SurfacePaper"
import { useBluetoothPrint } from "../hooks/printables/useBluetoothPrint"
import useItemReport from "../hooks/api/useItemReport"
import { useIsFocused } from "@react-navigation/native"
import useItems from "../hooks/api/useItems"
import ScrollableListContainer from "../components/ScrollableListContainer"
import ProductListSuggestion from "../components/ProductListSuggestion"

function StockReportScreen() {
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
    const [itemName, setItemName] = useState<string>(() => "")

    const [itemReport, setItemReport] = useState<ItemReport[]>(() => [])

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
        setItemName(item?.item_name)
        setSearch(() => "")
    }

    const handleGetItemReport = async (fromDate: string, toDate: string, companyId: number, branchId: number, productId: number, userId: string) => {
        if (fromDate > toDate) {
            ToastAndroid.show("From date must be lower than To date.", ToastAndroid.SHORT)
            return
        }
        if (itemName.length === 0) {
            ToastAndroid.show("Try searching for a product.", ToastAndroid.SHORT)
            return
        }
        await fetchItemReport(fromDate, toDate, companyId, branchId, productId, userId).then(res => {
            setItemReport(res?.data)
            console.log("XXXXXXXXXXXXXXXXX", res?.data)
        }).catch(err => {
            ToastAndroid.show("Error fetching item report.", ToastAndroid.SHORT)
        })
    }

    const handlePrint = (itemReport: ItemReport[], itemName: string) => {
        if (itemReport.length !== 0) {
            // printItemReport(itemName, itemReport, formattedFromDate, formattedToDate)
        } else {
            ToastAndroid.show("No Report Found!", ToastAndroid.SHORT)
            return
        }
    }

    let totalNetAmount: number = 0
    let totalQty: number = 0

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
                        Stock Report
                    </HeaderImage>
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
                    <ButtonPaper
                        onPress={() => console.log("handleGetItemReport(formattedFromDate, formattedToDate, loginStore.comp_id, loginStore.br_id, productId, loginStore?.user_id)")}
                        mode="contained-tonal"
                        buttonColor={theme.colors.green}
                        textColor={theme.colors.onGreen}>
                        SUBMIT
                    </ButtonPaper>
                </View>


                <SurfacePaper backgroundColor={theme.colors.surface}>
                    <View style={{ padding: normalize(10) }}>
                        <Text variant="bodyMedium">{itemName}</Text>
                    </View>
                    <DataTable>

                        <DataTable.Header>
                            <DataTable.Title>Rcpt. No.</DataTable.Title>
                            <DataTable.Title>Pay Mode</DataTable.Title>
                            <DataTable.Title numeric>Qty.</DataTable.Title>
                            <DataTable.Title numeric>Price</DataTable.Title>
                            <DataTable.Title numeric>Amount</DataTable.Title>
                        </DataTable.Header>

                        {itemReport.map((item, i) => {
                            totalNetAmount += item?.amount
                            totalQty += item?.qty

                            return (
                                <DataTable.Row key={i}>
                                    <DataTable.Cell>{item?.receipt_no?.toString()?.substring(item?.receipt_no?.toString()?.length - 4)}</DataTable.Cell>
                                    <DataTable.Cell>{item?.pay_mode === "C" ? "Cash" : item?.pay_mode === "U" ? "UPI" : item?.pay_mode === "D" ? "Card" : ""}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.qty}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.price}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item?.amount}</DataTable.Cell>
                                </DataTable.Row>
                            )
                        })}

                    </DataTable>
                    <View style={{ padding: normalize(10) }}>
                        <Text variant="labelMedium" style={{ color: theme.colors.purple }}>QUANTITY: {totalQty}  TOTAL: ₹{totalNetAmount?.toFixed(2)}</Text>
                    </View>
                </SurfacePaper>
                <View style={{ paddingHorizontal: normalize(20), paddingBottom: normalize(10) }}>
                    <ButtonPaper icon={"cloud-print-outline"} onPress={() => handlePrint(itemReport, itemName)} mode="contained-tonal">
                        PRINT
                    </ButtonPaper>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StockReportScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },

    title: {
        textAlign: "center",
    },
})
