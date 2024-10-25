import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();

  const navigateToHistory = () => {
    navigation.navigate("History");
  };

  const navigateToCertificate = () => {
    navigation.navigate("Certificate");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button title="View Order History" onPress={navigateToHistory} />
      <Button title="View Award Certificates" onPress={navigateToCertificate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
