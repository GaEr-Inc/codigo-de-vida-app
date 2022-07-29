import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import {
  Avatar,
  Button,
  Card,
  List,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { createClient } from "../util/Pocketbase";
import { SERVER } from "../state";
import { useRecoilValue } from "recoil";

function SearchScreen() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<
    [{ name: string; document: string }] | undefined
  >(undefined);
  const url = useRecoilValue(SERVER);
  const LeftContent = (props: any) => (
    <Avatar.Icon {...props} icon="account-outline" />
  );

  const searchPatient = async () => {
    const client = await createClient(url);
    const data = await client.Records.getList(
      "pacientes",
      undefined,
      undefined,
      {
        filter: `cedula ~ ${query}`,
      }
    );
    console.log(data);
    const patients = data.items.map((item) => ({ name: item.nombre, document: item.cedula })) as [{ name: string; document: string }];
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

      <ScrollView style={{ width: "90%"}}>
        {results?.map((result) => (
          <Patient name={result.name} document={result.document} style={{ marginVertical: 5}}/>
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

function Patient(props: { name: string; document: string; style: any; }): JSX.Element {
  return (
    <Card style={props.style}>
      <Card.Title
        title={props.name}
        subtitle={props.document}
        left={(props) => <Avatar.Icon {...props} icon="account-outline" />}
      />
      {/* <Card.Content> */}
      {/* <Title>Juan Cardona</Title> */}
      {/* <Paragraph>1006899987</Paragraph> */}
      {/* </Card.Content> */}
      <Card.Actions>
        <Button icon={"download"}>Exportar</Button>
        {/* <Button>Ok</Button> */}
      </Card.Actions>
    </Card>
  );
}
