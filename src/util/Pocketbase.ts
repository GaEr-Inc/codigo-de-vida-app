import Pocketbase from "pocketbase";
import { CustomAuthStore } from "./CustomAuthStore";
import RNStore from "./RNStore";
export async function createClient(
  url: string
): Promise<Pocketbase> {
  // const store = new CustomAuthStore("pocket-auth");
  const store = new RNStore();
  await store.restore();
  console.log("🚀 ~ file: Pocketbase.ts ~ store", store.model)
  return new Pocketbase(url, "en-US", store);
}

export async function logOut(url: string, setter: (valOrUpdater: boolean | ((currVal: boolean | undefined) => boolean | undefined) | undefined) => void) {
    const client = await createClient(url);
    client.authStore.clear();
    setter(undefined);
  }
