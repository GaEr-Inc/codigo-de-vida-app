import { View, Text } from 'react-native'
import React, { useDebugValue } from 'react'
import { useAgile } from '@agile-ts/react'
import {TEST_STATE} from '../State'
const Login = () => {
  const test = useAgile(TEST_STATE)
  return (
    <View>
      <Text>{test}</Text>
    </View>
  )
}

export default Login