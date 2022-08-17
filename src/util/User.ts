import Pocketbase from "pocketbase";
import { CustomAuthStore } from "./CustomAuthStore";

export async function getUserId(client?: Pocketbase, url?: string): Promise<string | undefined> {
  const store = new CustomAuthStore("pocket-auth");
  await store.restore();
  if (client === undefined || client === null){
    client = new Pocketbase(url, "en-US", store);
  }
  const tempModel: any = store.model;
  if (tempModel.profile === undefined) return "";
  return tempModel.profile.userId;
}
