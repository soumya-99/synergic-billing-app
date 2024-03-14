import React, { useContext, useEffect, useState, useRef } from "react"
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    ToastAndroid,
    Alert,
} from "react-native"
import { Searchbar, Text } from "react-native-paper"
import HeaderImage from "../components/HeaderImage"
import { textureBill, textureBillDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native"
import DialogBox from "../components/DialogBox"
import AddedProductList from "../components/AddedProductList"
import ButtonPaper from "../components/ButtonPaper"
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { loginStorage } from "../storage/appStorage"
import { RefundItemCredentials, ShowBillData } from "../models/api_types"
import { AppStore } from "../context/AppContext"
import InputPaper from "../components/InputPaper"
import { RefundItemsScreenRouteProp } from "../models/route_types"
import ScrollableListContainer from "../components/ScrollableListContainer"
import useCalculations from "../hooks/useCalculations"
import NetTotalForRePrints from "../components/NetTotalForRePrints"
import { gstFilterationAndTotalForRePrint } from "../utils/gstFilterTotalForRePrint"
import useRefundItems from "../hooks/api/useRefundItems"
import { mapRefundItemToFilteredItem } from "../utils/mapRefundItemToFilteredItem"
import navigationRoutes from "../routes/navigationRoutes"

function RefundItemsDataScreen() {
    const theme = usePaperColorScheme()
    const navigation = useNavigation()
    const { params } = useRoute<RefundItemsScreenRouteProp>()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { receiptSettings } = useContext(AppStore)

    const { netTotalCalculate, netTotalWithGSTCalculate, grandTotalWithGSTCalculate } = useCalculations()

    const { sendRefundItemDetails } = useRefundItems()

    const [visible, setVisible] = useState(() => false)
    const hideDialog = () => setVisible(() => false)

    const [product, setProduct] = useState<ShowBillData>()
    const [quantity, setQuantity] = useState<number>()
    const [position, setPosition] = useState<number>()

    const [filteredItems, setFilteredItems] = useState<ShowBillData[]>(
        () => [],
    )
    // const [billedSaleData, setBilledSaleData] = useState<ShowBillData[]>(() => params?.billed_sale_data)
    const [refundedData, setRefundedData] = useState<ShowBillData[]>(() => [])

    // const [refundedListData, setRefundedListData] = useState<ShowBillData[]>(() => [])

    const searchProductRef = useRef(null)


    const [search, setSearch] = useState<string>(() => "")
    const onChangeSearch = (query: string) => {
        setSearch(query)

        const filtered = params?.billed_sale_data?.filter((item: ShowBillData) => item?.item_name?.includes(query))
        setFilteredItems(filtered)
        if (query === "") setFilteredItems(() => [])
    }

    const onDialogFailure = () => {
        setSearch(() => "")
        setVisible(!visible)
    }

    const onDialogSuccecss = (item: ShowBillData) => {
        if (quantity <= item?.qty && quantity > 0) {
            if (refundedData.some(it => it.item_id === item.item_id)) {
                ToastAndroid.show("Item already added.", ToastAndroid.SHORT)
                setSearch(() => "")
                return
            }

            setVisible(!visible)
            refundedData.push({ ...item, qty: quantity, discount_amt: parseFloat(((item?.discount_amt / item?.qty) * quantity).toFixed(2)) })

            // dis_pertg: parseFloat(((item?.dis_pertg / item?.qty) * quantity).toFixed(2))
            setRefundedData(refundedData)
            setSearch(() => "")
        } else {
            ToastAndroid.show("Quantity must be less than or equal to previous quantity.", ToastAndroid.SHORT)
            return
        }
    }

    const onDialogSuccessChange = (item: ShowBillData) => {
        if (!quantity) {
            ToastAndroid.show("Add some quantity.", ToastAndroid.SHORT)
            return
        }
        onDialogSuccecss(item)
    }

    useEffect(() => {
        console.log("##########################", params?.billed_sale_data)
        // console.log("##########################", netTotal)
        // console.log("##########@@@@@@@@@@@@@@@@", totalDiscount)
        // console.log("##########%%%%%%%%%%%%%%%%", totalGst)
    }, [])

    const handleRefundedListUpdate = (item: ShowBillData, pos: number) => {
        setProduct(item)
        setQuantity(item?.qty)
        setVisible(!visible)
        setPosition(pos)
    }

    const handleRefundItems = async () => {
        const loginStore = JSON.parse(loginStorage.getString("login-data"))

        let filteredData: RefundItemCredentials[]

        const { totalGST } = gstFilterationAndTotalForRePrint(refundedData)

        filteredData = (refundedData).map(item =>
            // mapRefundItemToFilteredItem(loginStore?.user_id, item, netTotal, totalDiscount, totalGst)
            mapRefundItemToFilteredItem(loginStore?.user_id, item, netTotal, totalDiscount, totalGST)
        )

        await sendRefundItemDetails(filteredData).then(res => {
            ToastAndroid.show(`Items refunded! ~ Added to Stock. ${res?.data?.data}`, ToastAndroid.SHORT)
            navigation.dispatch(
                CommonActions.navigate({
                    name: navigationRoutes.refundItemsScreen,
                })
            )
        }).catch(err => {
            ToastAndroid.show("Some error while refunding!", ToastAndroid.SHORT)
        })
    }

    const handleRefundSubmit = () => {
        Alert.alert("Refund", "Are you sure you want to refund?", [
            { text: "NO", onPress: () => console.log("Cancelled!") },
            { text: "YES", onPress: () => handleRefundItems() }
        ])
    }

    let netTotal = 0
    let totalDiscount = 0
    let totalGst = 0

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: "center" }}>
                    <HeaderImage
                        imgLight={textureBill}
                        imgDark={textureBillDark}
                        borderRadius={30}
                        blur={10}
                        isBackEnabled>
                        Choose Products to Refund
                    </HeaderImage>
                </View>

                <View style={{
                    paddingHorizontal: normalize(20),
                    paddingBottom: normalize(10),
                }}>
                    {/* <ScrollableListContainer
                        backgroundColor={theme.colors.surfaceVariant}>
                        {billedSaleData?.map((item, i) => {
                            // netTotal += item.price * item.qty
                            // totalDiscount += (quantity == 0 ? 0 : item.discount_amt)

                            return (
                                <AddedProductList
                                    onPress={() => handleRefundedListUpdate(item, i)}
                                    itemName={item.item_name}
                                    quantity={item.qty}
                                    unitPrice={item.price}
                                    discount={quantity == 0 ? 0 : item.discount_amt}
                                    discountType={item?.discount_type}
                                    gstFlag={item?.gst_flag}
                                    key={i}
                                />
                            )
                        })}
                    </ScrollableListContainer> */}
                    <View style={{ marginBottom: normalize(10) }}>
                        <Searchbar
                            ref={searchProductRef}
                            autoFocus
                            placeholder="Search Products"
                            onChangeText={onChangeSearch}
                            value={search}
                            elevation={search && 2}
                            keyboardType="default"
                        // loading={search ? true : false}
                        />
                    </View>

                    {search && <ScrollableListContainer
                        backgroundColor={theme.colors.surfaceVariant}>
                        {filteredItems?.map((item, i) => {
                            // netTotal += item.price * item.qty
                            // totalDiscount += (quantity == 0 ? 0 : item.discount_amt)

                            return (
                                <AddedProductList
                                    onPress={() => handleRefundedListUpdate(item, i)}
                                    itemName={item.item_name}
                                    quantity={item.qty}
                                    unitPrice={item.price}
                                    discount={item?.discount_type === "P" ? item?.dis_pertg : item?.discount_amt}
                                    discountType={item?.discount_type}
                                    gstFlag={item?.gst_flag}
                                    key={i}
                                />
                            )
                        })}
                    </ScrollableListContainer>}
                </View>

                {refundedData.length > 0 && <View style={{
                    paddingHorizontal: normalize(20),
                    paddingBottom: normalize(10),
                }}>
                    <View style={{
                        width: SCREEN_WIDTH / 3,
                        height: normalize(50),
                        backgroundColor: theme.colors.primaryContainer,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        borderTopLeftRadius: normalize(20),
                        borderTopRightRadius: normalize(20),
                        // borderColor: theme.colors.onPrimaryContainer,
                        // borderStyle: "dashed",
                        // borderWidth: 1
                    }}>
                        <Text variant="headlineMedium">Refund Items</Text>
                    </View>
                    <ScrollableListContainer
                        backgroundColor={theme.colors.primaryContainer}>
                        {refundedData?.map((item, i) => {
                            netTotal += item.price * item.qty

                            // let dis: number = item?.discount_type === "P" ? (item?.dis_pertg / 100) : item?.discount_amt
                            totalDiscount += item?.discount_amt


                            // const { totalGST } = gstFilterationAndTotalForRePrint(refundedData)
                            // totalGst = totalGST
                            // item?.gst

                            return (
                                <AddedProductList
                                    disabled
                                    // onPress={() => handleRefundedListUpdate(item, i)}
                                    itemName={item.item_name}
                                    quantity={item.qty}
                                    unitPrice={item.price}
                                    discount={item?.discount_type === "P" ? item?.dis_pertg : item.discount_amt}
                                    discountType={item?.discount_type}
                                    gstFlag={item?.gst_flag}
                                    key={i}
                                />
                            )
                        })}
                    </ScrollableListContainer>
                    <NetTotalForRePrints
                        width={300}
                        backgroundColor={theme.colors.orangeContainer}
                        addedProductsList={refundedData}
                        netTotal={netTotal}
                        textColor={theme.colors.onGreenContainer}
                        totalDiscount={totalDiscount}
                        disabled
                    />
                </View>
                }

                <View style={{
                    backgroundColor: theme.colors.tertiaryContainer,
                    width: SCREEN_WIDTH / 1.2,
                    height: SCREEN_HEIGHT / 15,
                    alignSelf: "center",
                    marginBottom: normalize(10),
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {/* <Text variant="titleMedium" style={{ textAlign: "center", color: theme.colors.onTertiaryContainer, textTransform: "uppercase" }}>Refund Amount: ₹{netTotalCalculate(netTotal, totalDiscount)}</Text> */}
                    <Text variant="titleMedium" style={{ textAlign: "center", color: theme.colors.onTertiaryContainer, fontWeight: "800" }}>Refund Amount: ₹{grandTotalWithGSTCalculate(netTotal, totalDiscount, totalGst)} {refundedData[0]?.gst_flag === "Y" ? "(incl. GST)" : ""}</Text>
                </View>

                <View style={{ paddingHorizontal: normalize(30) }}>
                    <ButtonPaper mode="contained" onPress={handleRefundSubmit}>
                        REFUND
                    </ButtonPaper>
                </View>
            </ScrollView>
            <DialogBox hide={hideDialog} onFailure={onDialogFailure} onSuccess={() => onDialogSuccessChange(product)} visible={visible}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text variant="titleMedium" style={{ textAlign: "center" }}>{product?.item_name}</Text>
                </View>
                <InputPaper autoFocus keyboardType="numeric" label="Quantity" value={quantity} onChangeText={(txt: number) => setQuantity(txt)} />
            </DialogBox>
        </SafeAreaView>
    )
}

export default RefundItemsDataScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },

    title: {
        textAlign: "center",
    },
})
