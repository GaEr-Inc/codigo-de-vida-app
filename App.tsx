import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { StyleSheet } from "react-native";
import { Button, DefaultTheme, Provider } from "react-native-paper";
import Login from "./src/screens/Login";
import StartScreen from "./src/screens/StartScreen";
import { isLoggedIn, SERVER_URL } from "./src/state";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Connect } from "./Connect";
import { logOut } from "./src/util/Pocketbase";
import SearchScreen from "./src/screens/SearchScreen";
import { makePDF } from "./src/util/PDFExport";

export default function App() {
  return (
    <Provider theme={DefaultTheme}>
      <RecoilRoot>
        <MainScreen />
      </RecoilRoot>
    </Provider>
  );
}

const Drawer = createDrawerNavigator();
function MainScreen() {
  const [isLogged, setIsLogged] = useRecoilState(isLoggedIn);
  if (isLogged === undefined) {
    return <Connect />;
  }
  if (!isLogged && isLogged !== undefined) {
    return <Login />;
  } else if (isLogged)
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  label="Cerrar sesión"
                  onPress={() => logOut(SERVER_URL, setIsLogged)}
                />
              </DrawerContentScrollView>
            );
          }}
        >
          <Drawer.Screen name="Scanner" component={StartScreen} />
          <Drawer.Screen name="Buscar" component={SearchScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );

  return null;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
