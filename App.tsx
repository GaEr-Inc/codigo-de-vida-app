import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React from "react";
import {
  RecoilRoot,
  useRecoilState,
} from "recoil";
import { StyleSheet } from "react-native";
import {
  Button,
  DefaultTheme,
  Provider,
} from "react-native-paper";
import Login from "./src/screens/Login";
import MainScreen from "./src/screens/MainScreen";
import { isLoggedIn } from "./src/state";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Pocketbase from "pocketbase";
import { CustomAuthStore } from "./src/util/CustomAuthStore";
import { Connect } from "./Connect";

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
  
  if (isLogged === undefined) {
  return <Connect />;
  }
  if (!isLogged && isLogged !== undefined) {
    return <Login />;
  } else if (isLogged)
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Nombre de la App" component={MainScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  
  return null
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
