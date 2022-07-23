import React, { useEffect, useState } from "react";
import {
  useRecoilValue,
  useSetRecoilState
} from "recoil";
import { Text, View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { isLoggedIn, SERVER } from "./src/state";
import { ClientResponseError } from "pocketbase";
import { getUserId } from "./src/util/User";
import { createClient } from "./src/util/Pocketbase";

export function Connect() {
  const setIsLogged = useSetRecoilState(isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const url = useRecoilValue(SERVER);
  let unmounted = false;
  useEffect(() => {
    if (unmounted)
      return;
    if (!isLoading && !unmounted) {
      console.log("Executed");

      !isLoading ? setIsLoading(true) : null;
      tryLogin(setIsLogged).catch((e) => {
        console.log(unmounted);
        if (unmounted)
          return;
        const typedError = e as ClientResponseError;
        console.log(typedError.status);
        if (typedError.status > 400) {
          setIsLogged(false);
          return;
        }
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      unmounted = true;
    };
  }, []);
  const tryLogin = async (setter : (valOrUpdater: boolean | ((currVal: boolean | undefined) => boolean | undefined) | undefined) => void) => {
    const client = await createClient(url);
    const userId = await getUserId();
    await client.Users.getOne(userId!).then((user) => {
      console.log(user);
      if (user.profile?.id !== null){
        setter(true);
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text>
        <ActivityIndicator size={50} />;
      </Text>
      <Text style={{ paddingBottom: 15 }}>Conectando con el servidor...</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});