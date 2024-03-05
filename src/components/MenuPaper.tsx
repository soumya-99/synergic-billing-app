import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Menu } from 'react-native-paper'
import { loginStorage } from '../storage/appStorage'

type MenuPaperTypes = {
    menuArrOfObjects: { icon?: string, title: string, func: () => void }[]
    title?: string
}

export default function MenuPaper({ menuArrOfObjects, title = "Options" }: MenuPaperTypes) {
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    const loginStore = JSON.parse(loginStorage.getString("login-data"))

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button icon="chevron-down-circle-outline" onPress={openMenu} disabled={loginStore?.user_type !== "M"}>{title}</Button>}>

            {menuArrOfObjects?.map((item, i) => (
                <Menu.Item
                    key={i}
                    trailingIcon={item.icon}
                    onPress={() => {
                        item.func()
                        closeMenu()
                    }}
                    title={item.title}
                />
            ))}

        </Menu>
    )
}

const styles = StyleSheet.create({})