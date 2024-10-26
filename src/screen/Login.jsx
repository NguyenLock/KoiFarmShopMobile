import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../contexts/CartContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setUser } = useContext(CartContext);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://6715cc1b33bc2bfe40bb27f5.mockapi.io/users"
      );
      const users = await response.json();
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        Alert.alert("Login successful!");
        setUser(user);
        if (user.role === "admin") {
          navigation.navigate("Admin");
        } else {
          navigation.navigate("Home");
        }
      } else {
        Alert.alert("Invalid username or password.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/5a/9d/f1/5a9df1d261390348172ed12213c18fd4.png",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>ONKOI</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Bạn chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(249, 250, 253, 0.8)",
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#470101",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#470101",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#470101",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
