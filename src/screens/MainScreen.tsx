import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Appbar, Headline, List, Modal, Portal } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import Scanner from "./Scanner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn, scannedData, SERVER } from "../state";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createClient, logOut } from "../util/Pocketbase";

const Drawer = createDrawerNavigator();

const MainScreen = ({ navigation } : any) => {
  const [visible, setVisible] = React.useState(false);
  const scanData = useRecoilValue(scannedData);
  const url = useRecoilValue(SERVER);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);
  
  return (
    <View>
      <View style={styles.scanner}>
        <Scanner />
      </View>
      <View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>{scanData}</Text>
          </Modal>
        </Portal>
        <Headline style={styles.text}>Ultimos Registros</Headline>
        <ScrollView style={styles.scrollview}>
          <List.Item
            title="Titulo 1"
            description="Description 1"
            left={(props) => <List.Icon {...props} icon="heart" />}
            right={(props) => (
              <List.Icon {...props} icon="drag-horizontal-variant" />
            )}
            onPress={showModal}
          />
          <List.Item
            title="Titulo 1"
            description="Description 1"
            left={(props) => <List.Icon {...props} icon="heart" />}
            right={(props) => (
              <List.Icon {...props} icon="drag-horizontal-variant" />
            )}
            onPress={() => createClient(url).then((client) => {client.AuthStore.clear()})}
          />
          <List.Item
            title="Titulo 1"
            description="Description 1"
            left={(props) => <List.Icon {...props} icon="heart" />}
            right={(props) => (
              <List.Icon {...props} icon="drag-horizontal-variant" />
            )}
          />
          <List.Item
            title="Titulo 1"
            description="Description 1"
            left={(props) => <List.Icon {...props} icon="heart" />}
            right={(props) => (
              <List.Icon {...props} icon="drag-horizontal-variant" />
            )}
          />
          <List.Item
            title="Cerrar Sesion"
            description="Description 1"
            left={(props) => <List.Icon {...props} icon="heart" />}
            right={(props) => (
              <List.Icon {...props} icon="drag-horizontal-variant" />
            )}
            onPress={() => logOut(url, setIsLoggedIn)}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scanner: {
    width: "70%",
    height: "45%",
    marginTop: "15%",
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  scrollview: {
    marginTop: 10,
    height: "35%",
    overflow: "hidden",
  },
});

export default MainScreen;
