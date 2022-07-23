import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Avatar, Headline, List, Modal, Portal } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import Scanner from "./Scanner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn, scannedData, SERVER } from "../state";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createClient, logOut } from "../util/Pocketbase";
import { Record } from "pocketbase"
const Drawer = createDrawerNavigator();

const MainScreen = ({ navigation }: any) => {
  const [visible, setVisible] = useState(false);
  const scanData = useRecoilValue(scannedData);
  const [patientData, setPatientData] = useState<Record | undefined>(undefined);
  const url = useRecoilValue(SERVER);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);

  const searchPatient = async () => {
    const client = await createClient(url);
    const data = await client.Records.getOne("pacientes", scanData);
    console.log(data);
    setPatientData(data);
    return data
  }

  useEffect(() => {
    if (scanData !== "") {
      console.log("Scanned data:" + scanData);
      searchPatient().catch(console.error).then((patient) => {console.log(patient); showModal()});
    }
  }, [scanData]);
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
            contentContainerStyle={styles.containerStyle}
          >
          <Avatar.Image source={require("../../assets/favicon.png")} size={90}/>
            <Text>Nombre: {patientData?.nombre}</Text>
            <Text>Apellidos: {patientData?.apellidos}</Text>
            <Text>Edad: {patientData?.edad}</Text>
            <Text>Direccion: {patientData?.direccion}</Text>
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
            onPress={() =>
              createClient(url).then((client) => {
                client.AuthStore.clear();
              })
            }
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
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default MainScreen;
