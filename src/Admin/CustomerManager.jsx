import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Appbar, Card, Text } from "react-native-paper";

export default function CustomerManager() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "https://6715cc1b33bc2bfe40bb27f5.mockapi.io/users"
        );
        const data = await response.json();
        setCustomers(data.filter((item) => item.role === "customer"));
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const renderCustomer = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.customerName}>{item.username}</Text>
        <Text style={styles.customerRole}>{item.role}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Management</Text>
      <FlatList
        data={customers}
        renderItem={renderCustomer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  customerRole: {
    fontSize: 14,
    color: "gray",
  },
});
