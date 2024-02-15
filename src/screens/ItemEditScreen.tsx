import { View, ScrollView, StyleSheet, PixelRatio, ToastAndroid } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { List, Searchbar, Text } from "react-native-paper"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import normalize from "react-native-normalize"
import HeaderImage from "../components/HeaderImage"
import { flowerHome, flowerHomeDark } from "../resources/images"
import ScrollableListContainer from "../components/ScrollableListContainer"
import ProductListSuggestion from "../components/ProductListSuggestion"
import PRODUCTS_DATA from "../data/products_dummy_data.json"
import { usePaperColorScheme } from "../theme/theme"
import DialogBox from "../components/DialogBox"
import InputPaper from "../components/InputPaper"
import { clearStates } from "../utils/clearStates"
import { ItemsData } from "../models/api_types"
import { loginStorage } from "../storage/appStorage"
import useItems from "../hooks/api/useItems"
import { useIsFocused } from "@react-navigation/native"

type ProductsDataObject = {
    id: number
    item: string
    description: string
    unit_price: number
    unit: string
}

export default function ItemEditScreen() {
    const theme = usePaperColorScheme()
    const isFocused = useIsFocused()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))
    const [isExtended, setIsExtended] = useState(() => true)

    const [items, setItems] = useState<ItemsData[]>(() => [])

    const onScroll = ({ nativeEvent }) => {
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0
        setIsExtended(currentScrollPosition <= 0)
    }

    const { fetchItems } = useItems()

    const [visible, setVisible] = useState(() => false)
    const hideDialog = () => setVisible(() => false)

    const [search, setSearch] = useState<string>(() => "")
    const [filteredItems, setFilteredItems] = useState<ItemsData[]>(
        () => [],
    )

    const handleGetItems = async () => {
        const companyId = loginStore.comp_id
        let itemsData = await fetchItems(companyId)
        console.log("itemsData", itemsData)

        setItems(itemsData)
    }

    const onChangeSearch = (query: string) => {
        setSearch(query)

        const filtered = items.filter(item => item?.item_name?.includes(query))
        setFilteredItems(filtered)
        if (query === "") setFilteredItems(() => [])
    }

    const [hsnCode, setHsnCode] = useState<string>(() => "")
    const [productName, setProductName] = useState<string>(() => "")
    const [mrp, setMrp] = useState<string>(() => "")
    const [discount, setDiscount] = useState(() => "")
    const [CGST, setCGST] = useState<string>(() => "")
    const [SGST, setSGST] = useState<string>(() => "")

    const onDialogFailure = () => {
        clearStates([setSearch, setHsnCode, setProductName, setMrp, setDiscount, setCGST, setSGST], () => "")
        setVisible(!visible)
    }

    const onDialogSuccecss = () => {
        clearStates([setSearch, setHsnCode, setProductName, setMrp, setDiscount, setCGST, setSGST], () => "")
        setVisible(!visible)
        setFilteredItems(() => [])
    }
    useEffect(() => {
        handleGetItems()
    }, [isFocused])

    return (
        <SafeAreaView style={[{ backgroundColor: theme.colors.background, height: "100%" }]}>
            <ScrollView onScroll={onScroll}>
                <View style={{ alignItems: "center" }}>
                    <HeaderImage
                        isBackEnabled
                        imgLight={flowerHome}
                        imgDark={flowerHomeDark}
                        borderRadius={30}
                        blur={10}>
                        Edit Item
                    </HeaderImage>
                </View>
                <View style={{ padding: normalize(20) }}>
                    <Searchbar
                        placeholder="Search Products"
                        onChangeText={onChangeSearch}
                        value={search}
                        elevation={search && 2}
                        // loading={search ? true : false}
                        autoFocus
                    />
                </View>

                <View style={{ paddingBottom: PixelRatio.roundToNearestPixel(10) }}>
                    {search && (
                        <ScrollableListContainer
                            backgroundColor={theme.colors.surfaceVariant}>
                            {filteredItems.map(item => (
                                <ProductListSuggestion
                                    key={item.id}
                                    itemName={item.item_name}
                                    onPress={() => console.log("Product Clicked!!", item)}
                                    unitPrice={item.price}
                                />
                            ))}
                        </ScrollableListContainer>
                    )}
                </View>
            </ScrollView>
            <AnimatedFABPaper
                icon="plus"
                label="Add Item"
                onPress={() => setVisible(!visible)}
                extended={isExtended}
                animateFrom="right"
                iconMode="dynamic"
                customStyle={styles.fabStyle}
            />
            <DialogBox
                iconSize={40}
                visible={visible}
                hide={hideDialog}
                titleStyle={styles.title}
                btnSuccess="SAVE"
                onFailure={onDialogFailure}
                onSuccess={onDialogSuccecss}>
                <View style={{ justifyContent: "space-between", height: 300 }}>
                    <View style={{ alignItems: "center" }}>
                        <View>
                            <Text variant="titleLarge">Edit Item</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 5,
                        }}>
                        <View style={{ width: "50%" }}>
                            <Text variant="labelMedium">Sl No. 546454</Text>
                        </View>
                        <View style={{ width: "50%" }}>
                            <InputPaper
                                label="HSN Code"
                                onChangeText={(txt: string) => setHsnCode(txt)}
                                value={hsnCode}
                                keyboardType="default"
                                autoFocus
                                mode="outlined"
                            />
                        </View>
                    </View>

                    <View style={{ width: "100%" }}>
                        <InputPaper
                            label="Item Name"
                            onChangeText={(txt: string) => setProductName(txt)}
                            value={productName}
                            keyboardType="default"
                            mode="outlined"
                        />
                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                            marginLeft: 10,
                            marginRight: 10,
                        }}>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 5,
                        }}>
                        <View style={{ width: "50%" }}>
                            <InputPaper
                                label="M.R.P."
                                onChangeText={(txt: string) => setMrp(txt)}
                                value={mrp}
                                keyboardType="numeric"
                                mode="outlined"
                            />
                        </View>
                        <View style={{ width: "50%" }}>
                            <InputPaper
                                label="Discount"
                                onChangeText={(txt: string) => setDiscount(txt)}
                                value={discount}
                                keyboardType="numeric"
                                mode="outlined"
                            />
                        </View>
                    </View>

                    <View></View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 5,
                        }}>
                        <View style={{ width: "50%" }}>
                            <InputPaper
                                label="CGST (%)"
                                onChangeText={(txt: string) => setCGST(txt)}
                                value={CGST}
                                keyboardType="numeric"
                                mode="outlined"
                            />
                        </View>
                        <View style={{ width: "50%" }}>
                            <InputPaper
                                label="SGST (%)"
                                onChangeText={(txt: string) => setSGST(txt)}
                                value={SGST}
                                keyboardType="numeric"
                                mode="outlined"
                            />
                        </View>
                    </View>
                </View>
            </DialogBox>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fabStyle: {
        bottom: normalize(16),
        right: normalize(16),
        position: "absolute",
    },
    title: {
        textAlign: "center",
    },
})
