import Pocketbase from "pocketbase";
import { CustomAuthStore } from "./CustomAuthStore";
export async function createClient(
  url: string
): Promise<Pocketbase> {
  const store = new CustomAuthStore("pocket-auth");
  await store.restore();
  return new Pocketbase(url, "en-US", store);
}

export async function logOut(url: string, setter: (valOrUpdater: boolean | ((currVal: boolean | undefined) => boolean | undefined) | undefined) => void) {
    const client = await createClient(url);
    client.AuthStore.clear();
    setter(undefined);
  }
