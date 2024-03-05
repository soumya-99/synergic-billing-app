import { View, ScrollView, StyleSheet, PixelRatio, ToastAndroid } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { List, Searchbar, Text } from "react-native-paper"
import normalize, { SCREEN_HEIGHT } from "react-native-normalize"
import HeaderImage from "../components/HeaderImage"
import { flowerHome, flowerHomeDark } from "../resources/images"
import ScrollableListContainer from "../components/ScrollableListContainer"
import ProductListSuggestion from "../components/ProductListSuggestion"
import { usePaperColorScheme } from "../theme/theme"
import DialogBox from "../components/DialogBox"
import InputPaper from "../components/InputPaper"
import { clearStates } from "../utils/clearStates"
import { AddItemCredentials, AddUnitCredentials, ItemsData } from "../models/api_types"
import { loginStorage } from "../storage/appStorage"
import { useIsFocused } from "@react-navigation/native"
import useEditItem from "../hooks/api/useEditItem"
import { AppStore } from "../context/AppContext"
import AnimatedFABPaper from "../components/AnimatedFABPaper"
import useAddItem from "../hooks/api/useAddItem"
import useAddUnit from "../hooks/api/useAddUnit"

export default function ManageUnitsScreen() {
    const theme = usePaperColorScheme()
    const isFocused = useIsFocused()

    const { items, handleGetItems, receiptSettings } = useContext(AppStore)

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    const { editItem } = useEditItem()
    const { sendAddedItem } = useAddItem()
    const { sendAddedUnit } = useAddUnit()

    const [visible, setVisible] = useState(() => false)
    const hideDialog = () => setVisible(() => false)
    const [visibleAdd, setVisibleAdd] = useState(() => false)
    const hideDialogAdd = () => setVisibleAdd(() => false)

    const [search, setSearch] = useState<string>(() => "")
    const [filteredItems, setFilteredItems] = useState<ItemsData[]>(
        () => [],
    )

    const [isExtended, setIsExtended] = useState(() => true)

    const [product, setProduct] = useState<ItemsData>()

    // const [unit, setUnit] = useState<string>(() => product?.price)
    const [unit, setUnit] = useState<string>(() => "")

    const [unitName, setUnitName] = useState<string>(() => "")

    const onScroll = ({ nativeEvent }) => {
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0
        setIsExtended(currentScrollPosition <= 0)
    }

    const onChangeSearch = (query: string) => {
        setSearch(query)

        const filtered = items.filter((item: ItemsData) => item?.item_name?.includes(query))
        setFilteredItems(filtered)
        if (query === "") setFilteredItems(() => [])
    }

    const handleUpdateProductDetails = async () => {
        await editItem(loginStore?.comp_id, product?.item_id, unit, discount, CGST, SGST, loginStore?.user_name).then(res => {
            ToastAndroid.show("Product updated successfully.", ToastAndroid.SHORT)
        }).catch(err => {
            ToastAndroid.show("Error while updating product details.", ToastAndroid.SHORT)
        })
    }

    const onDialogFailure = () => {
        clearStates([setDiscount, setCGST, setSGST], () => 0)
        setUnit(() => undefined)
        setSearch(() => "")
        setVisible(!visible)
    }

    const onDialogSuccecss = () => {
        if (unit <= 0) {
            ToastAndroid.show("Try adding some price.", ToastAndroid.SHORT)
            return
        }
        handleUpdateProductDetails().then(() => {
            clearStates([setSearch, setDiscount, setCGST, setSGST], () => "")
            setUnit(() => undefined)
            setVisible(!visible)
            setFilteredItems(() => [])
        }).catch(err => {
            ToastAndroid.show("An error occurred while updating product", ToastAndroid.SHORT)
        })
    }

    const onDialogFailureAdd = () => {
        clearStates([setSearch, setUnitName], () => "")
        setUnit(() => "")
        setVisibleAdd(!visibleAdd)
    }

    const onDialogSuccecssAdd = () => {
        handleAddUnit().then(() => {
            clearStates([setUnitName], () => "")
            setUnit(() => "")
            setVisibleAdd(!visibleAdd)
        }).catch(err => {
            ToastAndroid.show("Something went wrong on server.", ToastAndroid.SHORT)
        })
    }

    const handleAddUnit = async () => {
        let addedUnitObject: AddUnitCredentials = {
            unit_name: unitName,
            created_by: loginStore?.user_name
        }

        if (unitName.length === 0) {
            ToastAndroid.show("Add Unit Name.", ToastAndroid.SHORT)
            return
        }

        await sendAddedUnit(addedUnitObject).then(res => {
            ToastAndroid.show("Unit has been added.", ToastAndroid.SHORT)
        }).catch(err => {
            ToastAndroid.show("Something went wrong on server", ToastAndroid.SHORT)
        })
    }

    const handleProductPressed = (item: ItemsData) => {
        setProduct(item)

        setUnit("handleProductPressed")

        setVisible(!visible)
    }

    useEffect(() => {
        handleGetItems()
    }, [isFocused])

    return (
        <SafeAreaView style={[{ backgroundColor: theme.colors.background, height: "100%" }]}>
            <ScrollView keyboardShouldPersistTaps="handled" onScroll={onScroll}>
                <View style={{ alignItems: "center" }}>
                    <HeaderImage
                        isBackEnabled
                        imgLight={flowerHome}
                        imgDark={flowerHomeDark}
                        borderRadius={30}
                        blur={10}>
                        Manage Units
                    </HeaderImage>
                </View>
                <View style={{ padding: normalize(20) }}>
                    {loginStore?.user_type === "M" ? (
                        <Searchbar
                            placeholder="Search Units"
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
                visible={visible}
                hide={hideDialog}
                titleStyle={styles.title}
                btnSuccess="SAVE"
                onFailure={onDialogFailure}
                onSuccess={onDialogSuccecss}>
                <View style={{ justifyContent: "space-between", height: "auto" }}>
                    <View style={{ alignItems: "center" }}>
                        <View>
                            <Text variant="titleLarge">Edit Unit</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 5,
                        }}>
                        <View style={{ width: "100%" }}>
                            <InputPaper
                                label="Unit"
                                onChangeText={(txt: string) => setUnit(txt)}
                                value={unit}
                                keyboardType="default"
                                mode="outlined"
                            />
                        </View>
                    </View>
                </View>
            </DialogBox>
            {loginStore?.user_type === "M" && (
                <AnimatedFABPaper
                    icon="weight-kilogram"
                    label="Add Unit"
                    onPress={() => setVisibleAdd(!visibleAdd)}
                    extended={isExtended}
                    animateFrom="right"
                    iconMode="dynamic"
                    customStyle={styles.fabStyle}
                />
            )}
            <DialogBox
                iconSize={40}
                visible={visibleAdd}
                hide={hideDialogAdd}
                titleStyle={styles.title}
                btnSuccess="SAVE"
                onFailure={onDialogFailureAdd}
                onSuccess={onDialogSuccecssAdd}>
                <View style={{ justifyContent: "space-between", height: "auto" }}>
                    <View style={{ alignItems: "center" }}>
                        <View>
                            <Text variant="titleLarge">Adding Unit</Text>
                        </View>
                    </View>

                    <View style={{ width: "100%" }}>
                        <InputPaper
                            autoFocus
                            label="Unit Name"
                            onChangeText={(txt: string) => setUnitName(txt)}
                            value={unitName}
                            keyboardType="default"
                            mode="outlined"
                            maxLength={30}
                        />
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
