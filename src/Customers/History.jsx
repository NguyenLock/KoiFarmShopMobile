import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Card } from "react-native-elements";
import { CartContext } from "../contexts/CartContext";
import OrderItem from "../components/OrderItem";

const History = () => {
  const { orders, clearOrders } = useContext(CartContext);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Order History</Text>

      {/* <Button title="Clear Orders" onPress={() => clearOrders()} /> */}

      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        orders.map((order) => <OrderItem key={order.id} order={order} />)
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
