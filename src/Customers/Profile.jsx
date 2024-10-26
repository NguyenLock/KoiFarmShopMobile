import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../contexts/CartContext";

export default function Profile() {
  const navigation = useNavigation();
  const { currentUser, logout } = useContext(CartContext);

  const navigateToHistory = () => {
    navigation.navigate("History");
  };

  const navigateToCertificate = () => {
    navigation.navigate("Certificate");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  const navigateLogout = () => {
    logout();
    if (currentUser.role === "customer") {
      Alert.alert("Logout Successful", "Thank you for shopping with us!");
    } else {
      Alert.alert("Logout Successful", "Goodbye!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {currentUser ? (
        <>
          <Text style={styles.title}>{currentUser.username}</Text>

          {currentUser?.role === "customer" && (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={navigateToHistory}
              >
                <Text style={styles.buttonText}>View Order History</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={navigateToCertificate}
              >
                <Text style={styles.buttonText}>View Award Certificates</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={navigateLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#470101",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
