import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { CartContext } from "../contexts/CartContext";

const History = () => {
  const { getOrders } = useContext(CartContext); // Get the getOrders function
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const savedOrders = await getOrders(); // Fetch saved orders
      setOrders(savedOrders);
    };
    fetchOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Order History</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        orders.map((order, index) => (
          <Card key={order.id} containerStyle={styles.card}>
            <Text style={styles.orderTitle}>Order #{order.id}</Text>
            <Text style={styles.orderDetail}>
              Full Name: {order.details.fullName}
            </Text>
            <Text style={styles.orderDetail}>Phone: {order.details.phone}</Text>
            <Text style={styles.orderDetail}>
              Address: {order.details.address}
            </Text>
            {order.details.voucher && (
              <Text style={styles.orderDetail}>
                Voucher: {order.details.voucher}
              </Text>
            )}

            <Text style={styles.sectionTitle}>Items:</Text>
            {order.items.map((item, i) => (
              <View key={i} style={styles.orderItem}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.priceText}>${item.price}</Text>
              </View>
            ))}
          </Card>
        ))
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
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderDetail: {
    fontSize: 16,
    marginVertical: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default History;
