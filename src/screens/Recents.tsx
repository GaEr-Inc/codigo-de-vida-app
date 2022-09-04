import { View, Text, ScrollView } from "react-native";
import React from "react";
import { PatientComp } from "./PatientComp";
import { nanoid } from "nanoid";

const Recents = () => {
  return (
    // <View style={{ justifyContent: "center", alignContent: "center" }}>
      <ScrollView style={{ marginTop: 5}}>
        {Array.from(Array(10)).map(() => <PatientComp
          key={nanoid()}
          name={"Juan Cardona"}
          document={"100543"}
          photo={""}
          record={null as any}
          style={{ marginVertical: 5, alignSelf: "center", width: "90%"}}
        />)
}
      </ScrollView>
    // </View>
  );
};

export default Recents;
