import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { AUTH_TOKEN, isLoggedIn, SERVER } from "../State";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const serverUrl = useRecoilValue(SERVER);
  const [token, setToken] = useRecoilState(AUTH_TOKEN);
  const [isLogged, setIsLogged] = useRecoilState(isLoggedIn);
  const handleLogin = async () => {
    console.log(password, email);
    const res = await axios.post(`${serverUrl}/auth/login`, {
      email: email,
      password: password,
    });
    console.log(res.data.token);
    setToken(res.data.token);
    const authres = await axios.get(`${serverUrl}`, {
      headers: { Authorization: `Bearer ${res.data.token}` },
    });
    if (authres.status === 200) {
      console.log("Login success");
       try {
        await AsyncStorage.setItem("AUTH_TOKEN", res.data.token);
      } catch (error) {
        console.log(error);
      }
    }
    setIsLogged(true);
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
