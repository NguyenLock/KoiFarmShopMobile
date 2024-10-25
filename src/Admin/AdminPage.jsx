import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AdminPage() {
  const navigation = useNavigation();

  const navigateToDashboard = () => {
    navigation.navigate("Dashboard");
  };

  const navigateToCustomer = () => {
    navigation.navigate("CustomerManagement");
  };

  const navigateToKoi = () => {
    navigation.navigate("KoiManagement");
  };

  const navigateToOrder = () => {
    navigation.navigate("OrderManagement");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Home Page</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToDashboard}>
        <Text style={styles.buttonText}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToCustomer}>
        <Text style={styles.buttonText}>Customer Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToKoi}>
        <Text style={styles.buttonText}>Koi Management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToOrder}>
        <Text style={styles.buttonText}>Order Management</Text>
      </TouchableOpacity>
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
