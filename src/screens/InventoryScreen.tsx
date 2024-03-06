import { View, ScrollView, StyleSheet, PixelRatio, ToastAndroid } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { List, Searchbar, Text } from "react-native-paper"
import normalize, { SCREEN_HEIGHT } from "react-native-normalize"
import HeaderImage from "../components/HeaderImage"
import { productHeader, productHeaderDark } from "../resources/images"
import ScrollableListContainer from "../components/ScrollableListContainer"
import ProductListSuggestion from "../components/ProductListSuggestion"
import { usePaperColorScheme } from "../theme/theme"
import DialogBox from "../components/DialogBox"
import InputPaper from "../components/InputPaper"
import { clearStates } from "../utils/clearStates"
import { AddItemCredentials, ItemEditRequestCredentials, ItemsData, StockSearchCredentials } from "../models/api_types"
import { loginStorage } from "../storage/appStorage"
import { useIsFocused } from "@react-navigation/native"
import useEditItem from "../hooks/api/useEditItem"
import { AppStore } from "../context/AppContext"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import useAddItem from "../hooks/api/useAddItem"
import MenuPaper from "../components/MenuPaper"
import useStockSearch from "../hooks/api/useStockSearch"

export default function InventoryScreen() {
    const theme = usePaperColorScheme()
    const isFocused = useIsFocused()

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { items, handleGetItems, units, handleGetUnits, receiptSettings } = useContext(AppStore)

    const { fetchStock } = useStockSearch()

    const [product, setProduct] = useState<ItemsData>()

    const [search, setSearch] = useState<string>(() => "")
    const [filteredItems, setFilteredItems] = useState<ItemsData[]>(
        () => [],
    )

    const onChangeSearch = (query: string) => {
        setSearch(query)

        const filtered = items.filter((item: ItemsData) => item?.item_name?.includes(query))
        setFilteredItems(filtered)
        if (query === "") setFilteredItems(() => [])
    }

    const handleProductPressed = (item: ItemsData) => {
        setProduct(item)
        handleFetchStock(item?.item_id)
    }

    const handleFetchStock = async (itemId: number) => {
        let fetchedStockObject: StockSearchCredentials = {
            comp_id: loginStore?.comp_id,
            br_id: loginStore?.br_id,
            item_id: itemId
        }

        let res = await fetchStock(fetchedStockObject)
        console.log("EEEEEEEEEEEEEEEEEEEEEEE", res)
    }

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
                                    onPress={() => console.log(handleProductPressed(item))}
                                    unitPrice={item.price}
                                />
                            ))}
                        </ScrollableListContainer>
                    )}
                </View>
            </ScrollView>
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
