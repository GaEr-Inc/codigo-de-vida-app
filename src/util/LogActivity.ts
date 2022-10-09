import { SERVER_URL } from "../state";
import { createClient } from "./Pocketbase";

export async function logAccess(id: string, from: string) {
  const client = await createClient(SERVER_URL);
  client.records.create("registros", {
  "id_usuario": client.authStore.model?.id,
  "id_paciente": id,
  "desde": from,
  "cliente": "app"
  })
}