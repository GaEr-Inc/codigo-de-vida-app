import { useAgile } from "@agile-ts/react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { AXIOS, SERVER, TEST_STATE } from "./State";

export default function App() {
  const test = useAgile(TEST_STATE);
  const url = useAgile(SERVER)
  const axiosInstance = axios.create({baseURL: url});
  const [data, setData] = useState("nada");

  const getData = async () => {
    try {
      const response = await axiosInstance.get("/");
      setData(response.data);
    } catch (error) {
      setData(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{data}</Text>
      <Button onPress={() => getData()}>Hola</Button>
      <StatusBar style="auto" />
    </View>
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
