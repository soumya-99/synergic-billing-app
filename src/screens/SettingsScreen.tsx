import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ButtonPaper from '../components/ButtonPaper'
import { AppStore } from '../context/AppContext'

export default function SettingsScreen() {
  const { logout } = useContext(AppStore)
  return (
    <View>
      <Text>SettingsScreen</Text>
      <View>
        <ButtonPaper mode='text' onPress={logout}>Log Out</ButtonPaper>
      </View>
    </View>
  )
}