import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import OrderDetailItem from "./OrderDetailItem";

export default function OrderItem({ order }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card key={order.id} containerStyle={styles.card}>
      <Text style={styles.orderTitle}>Order #{order.id}</Text>
      <Text style={styles.orderDetail}>
        Full Name: {order.details.fullName}
      </Text>
      <Text style={styles.orderDetail}>Phone: {order.details.phone}</Text>
      <Text style={styles.orderDetail}>Address: {order.details.address}</Text>
      <Text style={styles.orderDetail}>
        Payment Method: {order.details.selectedPayment}
      </Text>
      {order.details.voucher && (
        <Text style={styles.orderDetail}>Voucher: {order.details.voucher}</Text>
      )}

      <Text style={styles.orderDetail}>Status: {order.status}</Text>
      <Text style={styles.orderDetail}>
        Date: {new Date(order.createdAt).toLocaleDateString()}{" "}
        {new Date(order.createdAt).toLocaleTimeString()}
      </Text>

      <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
        <Text style={styles.toggleText}>
          {showDetails ? "Hide Details" : "Show Details"}
        </Text>
      </TouchableOpacity>

      {showDetails && (
        <>
          <Text style={styles.sectionTitle}>Order details:</Text>
          {order.items.map((item, i) => (
            <OrderDetailItem key={i} item={item} />
          ))}
        </>
      )}
      <Text style={styles.total}>Total: ${order.total}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
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
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#4CAF50",
    textAlign: "right",
  },
  toggleText: {
    color: "blue",
    fontWeight: "bold",
    marginVertical: 10,
  },
});
