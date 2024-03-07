import { View, ScrollView, StyleSheet, PixelRatio, ToastAndroid } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Searchbar, Text } from "react-native-paper"
import normalize, { SCREEN_HEIGHT } from "react-native-normalize"
import HeaderImage from "../components/HeaderImage"
import { productHeader, productHeaderDark } from "../resources/images"
import ScrollableListContainer from "../components/ScrollableListContainer"
import ProductListSuggestion from "../components/ProductListSuggestion"
import { usePaperColorScheme } from "../theme/theme"
import DialogBox from "../components/DialogBox"
import InputPaper from "../components/InputPaper"
import { clearStates } from "../utils/clearStates"
import { ItemsData, StockSearchCredentials, StockUpdateCredentials } from "../models/api_types"
import { loginStorage } from "../storage/appStorage"
import { useIsFocused } from "@react-navigation/native"
import { AppStore } from "../context/AppContext"
import useStockSearch from "../hooks/api/useStockSearch"
import useStockUpdate from "../hooks/api/useStockUpdate"

export default function InventoryScreen() {
    const theme = usePaperColorScheme()
    const isFocused = useIsFocused()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { items, handleGetItems, units, handleGetUnits, receiptSettings } = useContext(AppStore)

    const { fetchStock } = useStockSearch()
    const { updateStock } = useStockUpdate()

    const [product, setProduct] = useState<ItemsData>()
    const [stock, setStock] = useState<number>()
    const [addedStock, setAddedStock] = useState<number>()
    const [updatedStock, setUpdatedStock] = useState<number>()

    const [search, setSearch] = useState<string>(() => "")
    const [filteredItems, setFilteredItems] = useState<ItemsData[]>(
        () => [],
    )

    const [visibleAdd, setVisibleAdd] = useState<boolean>(() => false)
    const hideDialogAdd = () => setVisibleAdd(() => false)

    const onChangeSearch = (query: string) => {
        setSearch(query)

        const filtered = items.filter((item: ItemsData) => item?.item_name?.includes(query))
        setFilteredItems(filtered)
        if (query === "") setFilteredItems(() => [])
    }

    const handleProductPressed = (item: ItemsData) => {
        setProduct(item)
        handleFetchStock(item?.item_id).then(() => {
            setVisibleAdd(!visibleAdd)
        })
    }

    const handleFetchStock = async (itemId: number) => {
        let fetchedStockObject: StockSearchCredentials = {
            comp_id: loginStore?.comp_id,
            br_id: loginStore?.br_id,
            user_id: loginStore?.user_id,
            item_id: itemId
        }

        await fetchStock(fetchedStockObject).then(res => {
            console.log("handleFetchStock fetchStock", res)
            setStock(res?.stock)
        }).catch(err => {
            console.log("Something went wrong in handleFetchStock!", err)
        })
    }

    const handleUpdateStock = async (itemId: number, addedStock: number) => {
        let updatedStockObject: StockUpdateCredentials = {
            comp_id: loginStore?.comp_id,
            br_id: loginStore?.br_id,
            user_id: loginStore?.user_id,
            item_id: itemId,
            added_stock: addedStock
        }

        await updateStock(updatedStockObject).then(res => {
            ToastAndroid.show(res?.data, ToastAndroid.SHORT)
            setVisibleAdd(!visibleAdd)
        }).catch(err => {
            ToastAndroid.show("Something went wrong while updating stock.", ToastAndroid.SHORT)
        })
    }

    const onDialogFailureAdd = () => {
        clearStates([setStock, setAddedStock, setUpdatedStock], () => undefined)
        setVisibleAdd(!visibleAdd)
    }

    const onDialogSuccecssAdd = () => {
        if (addedStock <= 0 || addedStock === undefined || Number.isNaN(updatedStock)) {
            ToastAndroid.show("Try adding some Stock.", ToastAndroid.SHORT)
            return
        }
        handleUpdateStock(product?.item_id, addedStock).then(() => {
            clearStates([setStock, setAddedStock, setUpdatedStock], () => undefined)
            setVisibleAdd(!visibleAdd)
        })
    }

    useEffect(() => {
        //@ts-ignore
        setUpdatedStock(parseFloat(stock) + parseFloat(addedStock))
    }, [addedStock])

    useEffect(() => {
        handleGetItems()
        handleGetUnits()
    }, [isFocused])


    return (
        <SafeAreaView style={[{ backgroundColor: theme.colors.background, height: "100%" }]}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: "center" }}>
                    <HeaderImage
                        isBackEnabled
                        imgLight={productHeader}
                        imgDark={productHeaderDark}
                        borderRadius={30}
                        blur={10}>
                        Inventory
                    </HeaderImage>
                </View>

                <View style={{ padding: normalize(20) }}>
                    {loginStore?.user_type === "M" ? (
                        <Searchbar
                            placeholder="Search Products"
                            onChangeText={onChangeSearch}
                            value={search}
                            elevation={search && 2}
                            // loading={search ? true : false}
                            autoFocus
                        />
                    ) : (
                        <Text variant="displayMedium" style={{ alignSelf: "center", textAlign: "center", color: theme.colors.error }}>You don't have permissions to edit anything!</Text>
                    )}

                </View>

                <View style={{ paddingBottom: PixelRatio.roundToNearestPixel(10) }}>
                    {search && (
                        <ScrollableListContainer
                            backgroundColor={theme.colors.surfaceVariant}>
                            {filteredItems.map(item => (
                                <ProductListSuggestion
                                    key={item.id}
                                    itemName={item.item_name}
                                    onPress={() => handleProductPressed(item)}
                                    unitPrice={item.price}
                                />
                            ))}
                        </ScrollableListContainer>
                    )}
                </View>
            </ScrollView>
            <DialogBox
                iconSize={40}
                visible={visibleAdd}
                hide={hideDialogAdd}
                titleStyle={styles.title}
                btnSuccess="SAVE"
                onFailure={onDialogFailureAdd}
                onSuccess={onDialogSuccecssAdd}>
                <View style={{
                    justifyContent: "space-between",
                    minHeight: normalize(200),
                    height: "auto"
                }}>
                    <View style={{ alignItems: "center" }}>
                        <View>
                            <Text variant="titleLarge">Updating Stock</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <View>
                            <Text variant="titleMedium">{product?.item_name}</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                        }}>
                        <View>
                            <Text variant="labelMedium">UNIT</Text>
                        </View>
                        <View>
                            <Text variant="labelMedium">{product?.unit_name || ""}</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                        }}>
                        <View>
                            <Text variant="labelMedium">STOCK AVAILABLE</Text>
                        </View>
                        <View>
                            <Text variant="labelMedium">{stock}</Text>
                        </View>
                    </View>

                    <View style={{ width: "100%" }}>
                        <InputPaper
                            autoFocus
                            label="Add Stock"
                            onChangeText={(txt: number) => setAddedStock(txt)}
                            value={addedStock}
                            keyboardType="numeric"
                            mode="outlined"
                            maxLength={6}
                        />
                    </View>

                    <View
                        style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                        }}>
                        <View>
                            <Text variant="labelLarge">UPDATED STOCK</Text>
                        </View>
                        <View>
                            <Text variant="bodyMedium" style={{ color: theme.colors.green }}>{updatedStock || stock}</Text>
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
