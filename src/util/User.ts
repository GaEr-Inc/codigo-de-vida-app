import Pocketbase from "pocketbase";
import { CustomAuthStore } from "./CustomAuthStore";
import RNStore from "./RNStore";

export async function getUserId(client?: Pocketbase, url?: string): Promise<string | undefined> {
  // const store = new CustomAuthStore("pocket-auth");
  const store = new RNStore();
  await store.restore();
  if (client === undefined || client === null){
    client = new Pocketbase(url, "en-US", store);
  }
  console.log("ID:", store.model)
  return store.model?.id;
}
