import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, Provider } from "react-native-paper";
import Login from "./Screens/Login";
import MainScreen from "./Screens/MainScreen";
import { isLoggedIn, SERVER } from "./State";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";

export default function App() {
  return (
    <Provider theme={DefaultTheme}>
      <RecoilRoot>
        <Screen />
      </RecoilRoot>
    </Provider>
  );
}

const Drawer = createDrawerNavigator();
function Screen() {
  const [isLogged, setIsLogged] = useRecoilState(isLoggedIn);
  const serverUrl = useRecoilValue(SERVER);
  (async () => {
    const token = await AsyncStorage.getItem("AUTH_TOKEN");
    const authres = await axios.get(`${serverUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (authres.status === 200) {
      setIsLogged(true);
    }
  })();

  if (!isLogged) {
    return <Login />;
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Nombre de la App" component={MainScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
