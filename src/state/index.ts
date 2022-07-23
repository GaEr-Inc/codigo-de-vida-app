import { atom } from "recoil";
import Pocketbase from "pocketbase"
export const scannedData = atom({
  key: "scannedData",
  default: ""
})

export const isLoggedIn = atom<boolean | undefined>({
  key: "isLoggedIn",
  default: undefined
})

export const SERVER = atom({
  key: "SERVER",
  default: "http://192.168.1.103:8090"
})

export const AUTH_TOKEN = atom({
  key: "AUTH_TOKEN",
  default: ""
})



