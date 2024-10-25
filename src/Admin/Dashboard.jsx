import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { CartContext } from "../contexts/CartContext";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const [customersCount, setCustomersCount] = useState(0);
  const [koiFishCount, setKoiFishCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [orderLabels, setOrderLabels] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const { orders } = useContext(CartContext);

  useEffect(() => {
    const fetchFishes = async () => {
      try {
        const response = await fetch(
          "https://6717c8cdb910c6a6e029f8dd.mockapi.io/koiData/koiData"
        );
        const data = await response.json();
        setKoiFishCount(data.length);
      } catch (error) {
        console.error("Error fetching fishes:", error);
      }
    };
    fetchFishes();
  }, []);

  useEffect(() => {
    if (!orders || !Array.isArray(orders)) return;

    setOrdersCount(orders.length);

    const dailyTotals = {};
    for (let day = 1; day <= 31; day++) {
      const date = new Date(2024, 9, day).toLocaleDateString();
      dailyTotals[date] = 0;
    }

    orders.forEach((order) => {
      if (order.createdAt && typeof order.total === "number") {
        try {
          const date = new Date(order.createdAt).toLocaleDateString();
          if (dailyTotals.hasOwnProperty(date)) {
            dailyTotals[date] += order.total;
          }
        } catch (error) {
          console.warn("Invalid date in order", order);
        }
      }
    });

    const labels = Object.keys(dailyTotals);
    const data = Object.values(dailyTotals).map((value) =>
      isNaN(value) ? 0 : value
    );

    setOrderLabels(labels);
    setOrderData(data);
  }, [orders]);

  const chartData = {
    labels: orderLabels,
    datasets: [
      {
        data: orderData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Daily Order Total"],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.cardsContainer}>
        <Card style={[styles.card, styles.customerCard]}>
          <FontAwesome5
            name="users"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Customers</Text>
          <Text style={styles.cardValue}>{customersCount}</Text>
        </Card>

        <Card style={[styles.card, styles.koiCard]}>
          <FontAwesome5
            name="fish"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Koi Fish</Text>
          <Text style={styles.cardValue}>{koiFishCount}</Text>
        </Card>

        <Card style={[styles.card, styles.orderCard]}>
          <FontAwesome5
            name="shopping-cart"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Orders</Text>
          <Text style={styles.cardValue}>{ordersCount}</Text>
        </Card>
      </View>
      <Text style={styles.chartTitle}>Total Order Value (Monthly)</Text>

      {/* {orderLabels.length > 0 && orderData.length > 0 ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <LineChart
            data={chartData}
            width={screenWidth * 1.5} // Increase width if necessary
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            style={styles.chart}
          />
        </ScrollView>
      ) : null} */}

      <Text style={styles.sectionTitle}>Recent Orders</Text>
      <View style={styles.recentOrdersContainer}>
        {orders.slice(0, 5).map((order) => (
          <View key={order.id} style={styles.recentOrderItem}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderText}>Order #{order.id}</Text>
              <Text style={styles.orderAmount}>${order.total}</Text>
            </View>
            <Text style={styles.orderDate}>
              {new Date(order.createdAt).toLocaleDateString()}{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#470101",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  card: {
    width: "30%",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  customerCard: {
    backgroundColor: "#4CAF50",
  },
  koiCard: {
    backgroundColor: "#2196F3",
  },
  orderCard: {
    backgroundColor: "#FF9800",
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
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#470101",
    marginVertical: 20,
    textAlign: "center",
  },
  chart: {
    borderRadius: 10,
    marginBottom: 30,
  },
  recentOrdersContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  recentOrderItem: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  orderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  orderDate: {
    fontSize: 14,
    color: "#888",
    textAlign: "right",
  },
});
