import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../contexts/CartContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const { setUser } = useContext(CartContext);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }

    try {
      const existingUsersResponse = await fetch(
        "https://6715cc1b33bc2bfe40bb27f5.mockapi.io/users"
      );
      const existingUsers = await existingUsersResponse.json();

      const isUsernameTaken = existingUsers.some(
        (user) => user.username === username
      );

      if (isUsernameTaken) {
        Alert.alert(
          "Username already exists. Please choose a different username."
        );
        return;
      }

      const response = await fetch(
        "https://6715cc1b33bc2bfe40bb27f5.mockapi.io/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, role: "customer" }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Registration successful!");
        setUser(data);
        navigation.navigate("Home");
      } else {
        Alert.alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("An error occurred. Please try again.");
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
      <View style={styles.overlay}>
        <Text style={styles.title}>Register</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Log in</Text>
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(249, 250, 253, 0.8)",
    justifyContent: "center",
    padding: 20,
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
