import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, DataTable, Button } from "react-native-paper";
import { useRecoilState, useRecoilValue } from "recoil";
import { DETAILS_DATA, SERVER_URL } from "../state";
import { createClient } from "../util/Pocketbase";
import { addOnePatient } from "../util/RecentsUtil";
const Stack = createStackNavigator();

export default function ScanScreen() {
  return (
    <Stack.Navigator initialRouteName="Scan">
      <Stack.Screen
        name="Scan"
        component={Scanner}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

function Scanner({ navigation }: any) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [detailsData, setDetailsData] = useRecoilState(DETAILS_DATA);
  const [scanData, setScannedData] = useState("");

  
  const searchPatient = async (document?: string) => {
    const client = await createClient(SERVER_URL);
    const data = await client.Records.getOne(
      "pacientes",
      document === undefined ? scanData : document
      ).catch(() => undefined);
      console.log(data);
      return data;
    };
    
    if (!permission) {
      // Camera permissions are still loading
    return <View />;
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Tienes que dar permiso para la camara.
        </Text>
        <Button onPress={requestPermission}>Dar Permiso</Button>
      </View>
    );
  }
  
  function toggleCameraType() {
    setType((current) =>
    current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={async (result) => {
          console.log(result);
          setScannedData(result.data);
          const data: any = await searchPatient(result.data);
          if (data === undefined) {
            alert("Error");
            return;
          } else {
            setDetailsData({
              nombres: data.nombres,
              apellidos: data.apellidos,
              cedula: data.cedula,
              direccion: data.direccion,
              sangre: "sangre",
              id: data.id,
            });
            navigation.navigate("Details");
          }
        }}
        >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Details")}
            >
            <Text style={styles.text}>Ir a detalles</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}


const Details = () => {
  const data = useRecoilValue(DETAILS_DATA);
  useEffect(() => {
    if (data.id === "") return;
    addOnePatient(data);
  }, [data])
  return (
    <View>
      <Avatar.Icon
        style={{ alignSelf: "center", marginVertical: 18 }}
        size={150}
        icon="account-circle"
        />
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Nombre
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.nombres}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Apellidos
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.apellidos}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Cedula
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.cedula}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Direccion
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.direccion}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Tipo de Sangre
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.sangre}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={{ fontWeight: "bold", fontSize: 20 }}>
            Tipo de Sangre
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.id}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <Button
        icon="download"
        style={{ marginVertical: 5, marginHorizontal: 10 }}
        mode="contained"
      >
        Exportar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
