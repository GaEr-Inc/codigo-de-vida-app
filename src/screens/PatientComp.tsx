import React from "react";
import {
  Avatar,
  Button,
  Card
} from "react-native-paper";
import { makePDF } from "../util/PDFExport";
import { Record } from "pocketbase";
import { MAIN_SERVER } from "../state";
import { openBrowserAsync } from "expo-web-browser";

export function PatientComp(props: {
  id: string,
  name: string;
  document: string;
  photo: string;
  record: Record;
  style: any;
  onPress: () => void;
}): JSX.Element {
  const link = props.photo;
const record = props.record;
  return (
    <Card style={props.style} onPress={props.onPress}>
      <Card.Title
        title={props.name}
        subtitle={props.document}
        left={(props) => link === "" ? <Avatar.Icon icon={"account"} size={50} /> : <Avatar.Image source={{ uri: link }} size={50} />} />
      {/* <Card.Content> */}
      {/* <Title>Juan Cardona</Title> */}
      {/* <Paragraph>1006899987</Paragraph> */}
      {/* </Card.Content> */}
      <Card.Actions>
        <Button icon={"download"} onPress={() => {
          openBrowserAsync(`http://${MAIN_SERVER}:3000/generatepdf/${props.id}`)
        }}>Exportar</Button>
      </Card.Actions>
    </Card>
  );
}
