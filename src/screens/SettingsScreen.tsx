import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { logOut } from '../util/Pocketbase'
import { isLoggedIn, SERVER_URL } from '../state'
import { useSetRecoilState } from 'recoil'

const SettingsScreen = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);
  return (
    <View>
      <Button style={{marginHorizontal: 10, marginVertical: 5}} mode="contained" onPress={() => logOut(SERVER_URL, setIsLoggedIn)}>Cerrar Sesion</Button>
    </View>
  )
}

export default SettingsScreen