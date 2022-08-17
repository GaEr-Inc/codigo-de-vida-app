import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import { createClient } from "../util/Pocketbase";
import { useSetRecoilState } from "recoil";
import { isLoggedIn, SERVER_URL } from "../state";
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const setIsLogged = useSetRecoilState(isLoggedIn);
  const handleLogin = async () => {
    const client = await createClient(SERVER_URL);
    const user = await client.Users.authViaEmail(email, password)
    if (user.profile?.id !== null) {
      console.log(user);
      setIsLogged(true);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar.Icon style={styles.logo} size={150} icon="alpha-a-circle" />
      <TextInput
        style={styles.textInput}
        placeholder={"Usuario"}
        mode={"outlined"}
        label={"Usuario"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder={"Contrasena"}
        secureTextEntry={showPassword}
        mode={"outlined"}
        right={
          <TextInput.Icon
            name="eye"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        label={"Contrasena"}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => {
          handleLogin();
        }}
      >
        Iniciar Sesion
      </Button>
      <Text style={styles.text}>Olvide mi contraseña</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginTop: 10,
    marginBottom: 20,
    width: "90%",
  },
  button: {
    marginTop: 40,
    marginBottom: 10,
    width: "40%",
  },
  logo: {
    marginBottom: 30,
  },
  text: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Login;
