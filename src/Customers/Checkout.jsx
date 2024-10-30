import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../contexts/CartContext";
import OrderDetailItem from "../components/OrderDetailItem";

const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const sections = [
    { key: "yourInformation" },
    { key: "orderSummary" },
    { key: "consignment" },
    { key: "paymentMethod" },
    { key: "placeOrderButton" },
  ];
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [voucher, setVoucher] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("Cash On Delivery");
  const [consignment, setConsignment] = useState(false);

  const handleSelect = (option) => {
    setSelectedPayment(option);
  };

  useEffect(() => {
    if (route.params?.selectedLocationName) {
      setAddress(route.params.selectedLocationName);
    }
  }, [route.params?.selectedLocationName]);

  const { cart, clearCart, saveOrder, currentUser } = useContext(CartContext);

  const handlePlaceOrder = async () => {
    if (!fullName || !phone || !address) {
      Alert.alert("Error", "Please fill out all required fields.");
    } else {
      const orderDetail = {
        userId: currentUser.id,
        fullName,
        phone,
        address,
        voucher,
        selectedPayment,
        consignment,
      };
      await saveOrder(orderDetail, total);
      clearCart();
      Alert.alert("Order Placed", `Thank you for your purchase, ${fullName}!`);
      navigation.navigate("Home");
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const shippingFee = (calculateTotal() * 0.1).toFixed(2);

  const tax = (calculateTotal() * 0.05).toFixed(2);

  const total = (
    parseFloat(calculateTotal()) +
    parseFloat(shippingFee) +
    parseFloat(tax)
  ).toFixed(2);

  return (
    <FlatList
      data={sections}
      renderItem={({ item }) => {
        switch (item.key) {
          case "yourInformation":
            return (
              <Card containerStyle={styles.card}>
                <Text style={styles.sectionTitle}>Your Information</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                />
                <Button
                  title="Select address"
                  onPress={() => navigation.navigate("Map")}
                  buttonStyle={styles.placeOrderButton}
                  containerStyle={styles.buttonAddress}
                />
              </Card>
            );
          case "orderSummary":
            return (
              <Card containerStyle={styles.card}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                {cart.map((item, i) => (
                  <OrderDetailItem key={i} item={item} />
                ))}
                <View style={styles.orderItem}>
                  <Text style={styles.itemText}>Subtotal:</Text>
                  <Text style={styles.priceItem}>${calculateTotal()}</Text>
                </View>
                <View style={styles.orderItem}>
                  <Text style={styles.itemText}>Shipping fee:</Text>
                  <Text style={styles.priceItem}>${shippingFee}</Text>
                </View>
                <View style={styles.orderItem}>
                  <Text style={styles.itemText}>Tax:</Text>
                  <Text style={styles.priceItem}>${tax}</Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>Total:</Text>
                  <Text style={styles.priceText}>${total}</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Voucher Code (Optional)"
                  value={voucher}
                  onChangeText={setVoucher}
                />
              </Card>
            );
          case "consignment":
            return (
              <Card containerStyle={styles.card}>
                <Text style={styles.sectionTitle}>Consignment (optional)</Text>
                <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => setConsignment(!consignment)}
                >
                  <Icon
                    name={consignment ? "square" : "square-o"}
                    type="font-awesome"
                    size={24}
                    color={consignment ? "#4CAF50" : "#ccc"}
                  />
                  <Text style={styles.optionText}>Consignment</Text>
                </TouchableOpacity>
              </Card>
            );
          case "paymentMethod":
            return (
              <Card containerStyle={styles.card}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => handleSelect("Credit Card")}
                >
                  <Icon
                    name={
                      selectedPayment === "Credit Card"
                        ? "dot-circle-o"
                        : "circle-o"
                    }
                    type="font-awesome"
                    size={24}
                    color={
                      selectedPayment === "Credit Card" ? "#4CAF50" : "#ccc"
                    }
                  />
                  <Text style={styles.optionText}>Credit Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => handleSelect("Smart Banking")}
                >
                  <Icon
                    name={
                      selectedPayment === "Smart Banking"
                        ? "dot-circle-o"
                        : "circle-o"
                    }
                    type="font-awesome"
                    size={24}
                    color={
                      selectedPayment === "Smart Banking" ? "#4CAF50" : "#ccc"
                    }
                  />
                  <Text style={styles.optionText}>Smart Banking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.paymentOption}
                  onPress={() => handleSelect("Cash On Delivery")}
                >
                  <Icon
                    name={
                      selectedPayment === "Cash On Delivery"
                        ? "dot-circle-o"
                        : "circle-o"
                    }
                    type="font-awesome"
                    size={24}
                    color={
                      selectedPayment === "Cash On Delivery"
                        ? "#4CAF50"
                        : "#ccc"
                    }
                  />
                  <Text style={styles.optionText}>Cash On Delivery</Text>
                </TouchableOpacity>
              </Card>
            );
          case "placeOrderButton":
            return (
              <Button
                title="Place Order"
                onPress={handlePlaceOrder}
                buttonStyle={styles.placeOrderButton}
                containerStyle={styles.buttonContainer}
              />
            );
          default:
            return null;
        }
      }}
      keyExtractor={(item) => item.key}
    />
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
  card: {
    borderRadius: 12,
    padding: 15,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#470101",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
  },
  priceItem: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#470101",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#470101",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  placeOrderButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
  },
  buttonContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 12,
  },
  buttonAddress: {
    marginVertical: 20,
    borderRadius: 12,
  },
});

export default Checkout;
