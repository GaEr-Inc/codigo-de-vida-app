import { createState } from "@agile-ts/core"
import axios from "axios";

export const SERVER = createState<string>("http://192.168.0.22:3000");
export const AXIOS = createState(() => axios.create({baseURL: SERVER.value}));
export const TEST_STATE = createState(1);


