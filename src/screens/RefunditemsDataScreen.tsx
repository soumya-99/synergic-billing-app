import React, { useContext, useEffect, useState } from "react"
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    ToastAndroid,
} from "react-native"
import { Text } from "react-native-paper"
import HeaderImage from "../components/HeaderImage"
import { textureBill, textureBillDark } from "../resources/images"
import { usePaperColorScheme } from "../theme/theme"
import { useNavigation, useRoute } from "@react-navigation/native"
import DialogBox from "../components/DialogBox"
import AddedProductList from "../components/AddedProductList"
import ButtonPaper from "../components/ButtonPaper"
import normalize, { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { loginStorage } from "../storage/appStorage"
import { ShowBillData } from "../models/api_types"
import { AppStore } from "../context/AppContext"
import InputPaper from "../components/InputPaper"
import { RefundItemsScreenRouteProp } from "../models/route_types"
import ScrollableListContainer from "../components/ScrollableListContainer"

function RefundItemsDataScreen() {
    const theme = usePaperColorScheme()
    const navigation = useNavigation()
    const { params } = useRoute<RefundItemsScreenRouteProp>()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { receiptSettings } = useContext(AppStore)

    const [visible, setVisible] = useState(() => false)
    const hideDialog = () => setVisible(() => false)

    const [product, setProduct] = useState<ShowBillData>()
    const [quantity, setQuantity] = useState<number>()
    const [position, setPosition] = useState<number>()

    const [billedSaleData, setBilledSaleData] = useState<ShowBillData[]>(() => params?.billed_sale_data)

    // const [refundedListData, setRefundedListData] = useState<ShowBillData[]>(() => [])

    const onDialogFailure = () => {
        setVisible(!visible)
    }

    const onDialogSuccecss = (item: ShowBillData) => {
        if (quantity <= item?.qty) {
            // item["qty"] -= quantity
            item["qty"] = quantity

            setVisible(!visible)

            billedSaleData.splice(position, 1, item)
            setBilledSaleData(billedSaleData)
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
    }, [])

    const handleRefundedListUpdate = (item: ShowBillData, pos: number) => {
        setProduct(item)
        setQuantity(item?.qty)
        setVisible(!visible)
        setPosition(pos)
    }

    let netTotal = 0
    let totalDiscount = 0

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
                        Choose Items to Refund
                    </HeaderImage>
                </View>

                <View style={{
                    paddingHorizontal: normalize(20),
                    paddingBottom: normalize(10),
                }}>
                    <ScrollableListContainer
                        backgroundColor={theme.colors.surfaceVariant}>
                        {billedSaleData?.map((item, i) => {
                            netTotal += item.price * item.qty
                            totalDiscount += (quantity == 0 ? 0 : item.discount_amt)

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
                    </ScrollableListContainer>
                </View>

                <View style={{
                    backgroundColor: theme.colors.tertiaryContainer,
                    width: SCREEN_WIDTH / 1.2,
                    height: SCREEN_HEIGHT / 15,
                    alignSelf: "center",
                    marginBottom: normalize(10),
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text variant="titleMedium" style={{ textAlign: "center", color: theme.colors.onTertiaryContainer }}>Refund Amount: {netTotal - totalDiscount}</Text>
                </View>

                <View style={{ paddingHorizontal: normalize(20) }}>
                    <ButtonPaper mode="contained" onPress={() => console.log("REFUNDED")}>
                        REFUND
                    </ButtonPaper>
                </View>
            </ScrollView>
            <DialogBox hide={hideDialog} onFailure={onDialogFailure} onSuccess={() => onDialogSuccessChange(product)} visible={visible}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text variant="titleMedium" style={{ textAlign: "center" }}>{product?.item_name}</Text>
                </View>
                <InputPaper keyboardType="numeric" label="Quantity" value={quantity} onChangeText={(txt: number) => setQuantity(txt)} />
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
