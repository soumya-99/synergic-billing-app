import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Menu } from 'react-native-paper'

type MenuPaperTypes = {
    menuArrOfObjects: { icon: string, title: string, func: () => void }[]
}

export default function MenuPaper({ menuArrOfObjects }: MenuPaperTypes) {

    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Options</Button>}>

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