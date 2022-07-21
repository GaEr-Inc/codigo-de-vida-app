import { atom } from "recoil";

export const scannedData = atom({
  key: "scannedData",
  default: ""
})

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: false
})

export const SERVER = atom({
  key: "SERVER",
  default: "http://192.168.1.101:3000"
})

export const AUTH_TOKEN = atom({
  key: "AUTH_TOKEN",
  default: ""
})


