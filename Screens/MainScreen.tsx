import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Appbar, Headline, List } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import Scanner from "./Scanner";

const MainScreen = () => {
  return (
    <View>
      <Appbar style={styles.appbar}>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="Nombre de app" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar>
      <View style={styles.scanner}>
        <Scanner/>
      </View>
      <View>
        <Headline style={styles.text}>Ultimos Registros</Headline>
        <ScrollView style={styles.scrollview}>
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
            title="Titulo 1"
            description="Description 1"
            left={(props) => <List.Icon {...props} icon="heart" />}
            right={(props) => (
              <List.Icon {...props} icon="drag-horizontal-variant" />
            )}
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
  appbar: {
    backgroundColor: "#fff",
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
  }
});

export default MainScreen;
