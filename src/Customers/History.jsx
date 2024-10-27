import React, { useContext } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { CartContext } from "../contexts/CartContext";
import OrderItem from "../components/OrderItem";

const History = () => {
  const { personalOrders } = useContext(CartContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Order History</Text>

      {personalOrders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        personalOrders.map((order) => <OrderItem key={order.id} order={order} />)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  noOrdersText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default History;
