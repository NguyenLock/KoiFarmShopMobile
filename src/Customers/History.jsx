import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { CartContext } from "../contexts/CartContext";

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
                  <View key={i} style={styles.fishContainer}>
                    <View style={styles.fishCard}>
                      <View style={styles.imageWrapper}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.image}
                        />
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.fishName}>{item.name}</Text>
                        <View style={styles.priceContainer}>
                          <Text style={styles.price}>${item.price}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                          <Text style={styles.quantityText}>
                            {item.quantity}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}
            <Text style={styles.total}>Total: ${order.total}</Text>
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
  //---------------------------------------------------------------------------------
  fishContainer: {
    marginBottom: 15,
  },
  fishCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    width: 120,
    height: 120,
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  fishName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  quantityContainer: {
    width: "auto",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    zIndex: 1,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    marginHorizontal: 10,
  },
});

export default History;
