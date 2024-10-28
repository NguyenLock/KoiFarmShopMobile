import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CartContext } from "../contexts/CartContext";
import OrderItem from "../components/OrderItem";
import { Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { Card } from "react-native-paper";

export default function OrderManager() {
  const { orders, clearOrders } = useContext(CartContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Order History</Text>

      <View style={styles.cardsContainer}>
        <Card style={[styles.card, styles.pending]}>
          <FontAwesome5
            name="shopping-cart"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Pending</Text>
          <Text style={styles.cardValue}>{0}</Text>
        </Card>

        <Card style={[styles.card, styles.processing]}>
          <FontAwesome5
            name="shopping-cart"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Processing</Text>
          <Text style={styles.cardValue}>{0}</Text>
        </Card>

        <Card style={[styles.card, styles.shipping]}>
          <FontAwesome5
            name="shopping-cart"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Shipping</Text>
          <Text style={styles.cardValue}>{0}</Text>
        </Card>

        <Card style={[styles.card, styles.successful]}>
          <FontAwesome5
            name="shopping-cart"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Successful</Text>
          <Text style={styles.cardValue}>{0}</Text>
        </Card>

        <Card style={[styles.card, styles.error]}>
          <FontAwesome5
            name="shopping-cart"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Error</Text>
          <Text style={styles.cardValue}>{0}</Text>
        </Card>

        <Card style={[styles.card, styles.consignment]}>
          <FontAwesome5
            name="shopping-cart"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Consigning</Text>
          <Text style={styles.cardValue}>{0}</Text>
        </Card>
      </View>

      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        orders.map((order) => <OrderItem key={order.id} order={order} />)
      )}

      <Button title="Clear Orders" onPress={() => clearOrders()} />
    </ScrollView>
  );
}

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
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    width: "30%",
    paddingVertical: 20,
    paddingStart: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 10,
  },
  pending: {
    backgroundColor: "#f3a638",
  },
  processing: {
    backgroundColor: "#54b7d3",
  },
  shipping: {
    backgroundColor: "#1e91cf",
  },
  successful: {
    backgroundColor: "#4cb64c",
  },
  error: {
    backgroundColor: "#e3503e",
  },
  consignment: {
    backgroundColor: "#d6b7ce",
  },
  icon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
});
