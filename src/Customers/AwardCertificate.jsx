import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";

export default function AwardCertificate() {
  const { orders } = useContext(CartContext);
  const [filterOrders, setFilterOrders] = useState([]);

  useEffect(() => {
    const filteredOrders = orders.filter(
      (order) => order.items.filter((item) => item.awardCertificate).length > 0
    );
    setFilterOrders(filteredOrders);
  }, [orders]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Award Certificate</Text>

      {filterOrders.length === 0 ? (
        <Text style={styles.noOrdersText}>No certificate yet</Text>
      ) : (
        <View>
          {filterOrders.map((order) => (
            <Card key={order.id} containerStyle={styles.card}>
              <Text style={styles.orderTitle}>
                Date: {new Date(order.createdAt).toLocaleDateString()}{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </Text>

              {order.items.map(
                (item, i) =>
                  item.awardCertificate && (
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
                        </View>
                      </View>
                    </View>
                  )
              )}
            </Card>
          ))}
        </View>
      )}
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
    color: "#470101",
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
    fontSize: 16,
    marginBottom: 20,
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
    color: "#470101",
    marginBottom: 4,
  },
});
