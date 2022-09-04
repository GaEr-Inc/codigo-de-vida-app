import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getRecentPatients(): Promise<
  {
    nombres: string;
    apellidos: string;
    cedula: string;
    direccion: string;
    sangre: string;
    id: string;
  }[]
> {
  const recents = await AsyncStorage.getItem("@recent-patients");
  if (recents === null) {
    return [];
  } else {
    return JSON.parse(recents);
  }
}

export async function setRecentPatients(
  recents: {
    nombres: string;
    apellidos: string;
    cedula: string;
    direccion: string;
    sangre: string;
    id: string;
  }[]
) {
  await AsyncStorage.setItem("@recent-patients", JSON.stringify(recents));
}

export async function addOnePatient(patient: {
  nombres: string;
  apellidos: string;
  cedula: string;
  direccion: string;
  sangre: string;
  id: string;
}) {
  let isDuplicate = false;
  const currentPatients = await getRecentPatients();
  currentPatients.map((currentPatient) => {
    if (currentPatient.id === patient.id) {
      isDuplicate = true;
    }
  });
  if (isDuplicate) {
    return;
  }
  currentPatients.push(patient);
  await AsyncStorage.setItem(
    "@recent-patients",
    JSON.stringify(currentPatients)
  );
}
