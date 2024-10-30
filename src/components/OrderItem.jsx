import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import OrderDetailItem from "./OrderDetailItem";
import { CartContext } from "../contexts/CartContext";
import { Picker } from "@react-native-picker/picker";

export default function OrderItem({ order }) {
  const [showDetails, setShowDetails] = useState(false);
  const { updateOrderStatus, currentUser } = useContext(CartContext);
  const statuses = ["Pending", "Processing", "Shipping", "Successful", "Error"];
  const [colorStatus, setColorStatus] = useState("#f3a638");

  useEffect(() => {
    if (order.status === "Consignment") {
      setColorStatus("#d6b7ce");
    } else if (order.status === "Successful") {
      setColorStatus("#4cb64c");
    } else if (order.status === "Error") {
      setColorStatus("#e3503e");
    } else if (order.status === "Shipping") {
      setColorStatus("#1e91cf");
    } else if (order.status === "Processing") {
      setColorStatus("#54b7d3");
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <TouchableOpacity
      key={order.id}
      style={styles.card}
      onPress={() => setShowDetails(!showDetails)}
    >
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

      <Text style={[styles.orderDetail, { color: colorStatus }]}>
        Status: {order.status}{" "}
        {order.details.consignment
          ? "- " + formatDate(order.details.consignmentDate)
          : ""}
      </Text>
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

      {currentUser?.role === "admin" &&
        order.status !== "Successful" &&
        order.status !== "Consignment" && (
          <>
            <Text style={styles.statusLabel}>Select Status:</Text>
            <Picker
              selectedValue={order.status}
              onValueChange={(itemValue) => {
                setColorStatus(
                  itemValue === "Pending"
                    ? "#f3a638"
                    : itemValue === "Processing"
                    ? "#54b7d3"
                    : itemValue === "Shipping"
                    ? "#1e91cf"
                    : itemValue === "Error"
                    ? "#e3503e"
                    : itemValue === "Successful"
                    ? "#4cb64c"
                    : "#f3a638"
                );
                updateOrderStatus(order.id, itemValue, order.details.userId);
              }}
              style={styles.picker}
            >
              {statuses
                .filter((status) => status !== order.status)
                .map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
            </Picker>
          </>
        )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#4CAF50",
    color: "white",
    marginTop: 10,
  },
  pending: {
    color: "#f3a638",
  },
  processing: {
    color: "#54b7d3",
  },
  shipping: {
    color: "#1e91cf",
  },
  successful: {
    color: "#4cb64c",
  },
  error: {
    color: "#e3503e",
  },
  consignment: {
    color: "#d6b7ce",
  },
});
