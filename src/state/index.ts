import { atom } from "recoil";
export const scannedData = atom({
  key: "scannedData",
  default: "",
});

export const isLoggedIn = atom<boolean | undefined>({
  key: "isLoggedIn",
  default: undefined,
});

export const SERVER_URL = "http://192.168.1.114:8090";
export const SERVER = atom({
  key: "SERVER",
  default: SERVER_URL,
});

export const AUTH_TOKEN = atom({
  key: "AUTH_TOKEN",
  default: "",
});
