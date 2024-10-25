import React, { useContext, useState } from "react";
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

const Checkout = () => {
  const navigation = useNavigation();
  const sections = [
    { key: "yourInformation" },
    { key: "orderSummary" },
    { key: "paymentMethod" },
    { key: "placeOrderButton" },
  ];
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [voucher, setVoucher] = useState("");

  const { cart, clearCart, saveOrder } = useContext(CartContext);

  const handlePlaceOrder = async () => {
    if (!fullName || !phone || !address) {
      Alert.alert("Error", "Please fill out all required fields.");
    } else {
      const orderDetail = { fullName, phone, address, voucher };
      await saveOrder(orderDetail, total);
      clearCart();
      Alert.alert("Order Placed", `Thank you for your purchase, ${fullName}!`);
      navigation.navigate("Home");
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
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
              </Card>
            );
          case "orderSummary":
            return (
              <Card containerStyle={styles.card}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                <FlatList
                  data={cart}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.fishContainer}>
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
                  )}
                />
                <View style={styles.orderItem}>
                  <Text style={styles.itemText}>Subtotal:</Text>
                  <Text style={styles.priceText}>${calculateTotal()}</Text>
                </View>
                <View style={styles.orderItem}>
                  <Text style={styles.itemText}>Shipping fee:</Text>
                  <Text style={styles.priceText}>${shippingFee}</Text>
                </View>
                <View style={styles.orderItem}>
                  <Text style={styles.itemText}>Tax:</Text>
                  <Text style={styles.priceText}>${tax}</Text>
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
          case "paymentMethod":
            return (
              <Card containerStyle={styles.card}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <TouchableOpacity style={styles.paymentOption}>
                  <Icon
                    name="credit-card"
                    type="font-awesome"
                    size={24}
                    color="#333"
                  />
                  <Text style={styles.optionText}>Credit Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentOption}>
                  <Icon
                    name="paypal"
                    type="font-awesome"
                    size={24}
                    color="#333"
                  />
                  <Text style={styles.optionText}>PayPal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentOption}>
                  <Icon
                    name="bank"
                    type="font-awesome"
                    size={24}
                    color="#333"
                  />
                  <Text style={styles.optionText}>Bank Transfer</Text>
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
    marginBottom: 10,
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
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
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

export default Checkout;
