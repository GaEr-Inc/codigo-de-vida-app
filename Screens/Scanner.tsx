import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, IconButton} from "react-native-paper";

function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [modalText, setModalText] = useState("");
  const [testText, setTestText] = useState("Qr read");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    setTestText(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {
        modalVisible ? 
        <View>
        <IconButton icon="reload" size={70} onPress={() => {
          setModalVisible(false)
        }}/>
        <Text>{testText}</Text>
        </View>
        :
        <BarCodeScanner
          style={styles.scanner}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scanner: {
    width: "100%",
    height: "100%",
  },
});

export default Scanner;
