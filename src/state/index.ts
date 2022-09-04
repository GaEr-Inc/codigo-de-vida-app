import { atom } from "recoil";
export const scannedData = atom({
  key: "scannedData",
  default: "",
});

export const isLoggedIn = atom<boolean | undefined>({
  key: "isLoggedIn",
  default: undefined,
});

export const SERVER_URL = "http://127.0.0.1:8090";
export const SERVER = atom({
  key: "SERVER",
  default: SERVER_URL,
});

export const AUTH_TOKEN = atom({
  key: "AUTH_TOKEN",
  default: "",
});

export const DETAILS_DATA = atom<{nombres: string; cedula: string; direccion: string; sangre: string; apellidos: string; id: string;}>({
  key: "detailsData",
  default: {
    nombres: "",
    cedula: "",
    apellidos: "",
    direccion: "",
    sangre: "",
    id: "",
    },
});