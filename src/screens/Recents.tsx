import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { PatientComp } from "./PatientComp";
import { nanoid } from "nanoid";
import { useState } from "react";
import { getRecentPatients } from "../util/RecentsUtil";

const Recents = () => {
  const [recentPatients, setRecentPatients] = useState<{nombres: string; cedula: string; direccion: string; sangre: string; apellidos: string; id: string;}[]>([]);

  useEffect(() => {
    getRecentPatients().then((recentPatients) => {setRecentPatients(recentPatients); console.log(recentPatients);});
    return () => {
    }
  }, [])

  return (
    // <View style={{ justifyContent: "center", alignContent: "center" }}>
      <ScrollView style={{ marginTop: 5}}>
        {recentPatients.map((patient) => <PatientComp
          key={nanoid()}
          name={patient.nombres}
          document={patient.cedula}
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
