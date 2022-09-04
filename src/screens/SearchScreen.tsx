import "react-native-get-random-values";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  Avatar,
  List,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { createClient } from "../util/Pocketbase";
import { SERVER_URL } from "../state";
import { nanoid } from "nanoid";
import { Record } from "pocketbase"
import { PatientComp } from "./PatientComp";

function SearchScreen() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<
    Record[] | undefined
  >(undefined);
  const LeftContent = (props: any) => (
    <Avatar.Icon {...props} icon="account-outline" />
    );
    const searchPatient = async () => {
    const client = await createClient(SERVER_URL);
    const data = await client.Records.getList(
      "pacientes",
      undefined,
      undefined,
      {
        filter: `cedula ~ ${query}`,
      }
    );
    data.items.map((item) => {
      console.log(client.Records.getFileUrl(item, item.foto));
    });
    console.log(data);
    const patients = data.items
    setResults(patients);
    return data;
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={"Numero de cedula"}
        mode={"outlined"}
        right={
          <TextInput.Icon
            name="file-search-outline"
            onPress={() => searchPatient()}
          />
        }
        label={"Cedula"}
        value={query}
        onEndEditing={() => console.log("hi")}
        onChangeText={(text) => setQuery(text)}
      />

      <ScrollView style={{ width: "90%" }}>
        {results?.map((result) => (
          <PatientComp
            key={nanoid()}
            name={result.nombres}
            document={result.cedula}
            photo={result.foto}
            record={result}
            style={{ marginVertical: 5 }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginTop: 10,
    marginBottom: 20,
    width: "90%",
  },
});

export default SearchScreen;


