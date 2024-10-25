import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../contexts/CartContext";

const Checkout = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [voucher, setVoucher] = useState("");

  const { cart, clearCart, saveOrder } = useContext(CartContext);

  const handlePlaceOrder = async () => {
    if (!fullName || !phone || !address) {
      Alert.alert("Error", "Please fill out all required fields.");
    } else {
      const orderDetails = { fullName, phone, address, voucher };
      await saveOrder(orderDetails);
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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

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

      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
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

      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity style={styles.paymentOption}>
          <Icon name="credit-card" type="font-awesome" size={24} color="#333" />
          <Text style={styles.optionText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          <Icon name="paypal" type="font-awesome" size={24} color="#333" />
          <Text style={styles.optionText}>PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption}>
          <Icon name="bank" type="font-awesome" size={24} color="#333" />
          <Text style={styles.optionText}>Bank Transfer</Text>
        </TouchableOpacity>
      </Card>

      <Button
        title="Place Order"
        onPress={handlePlaceOrder}
        buttonStyle={styles.placeOrderButton}
        containerStyle={styles.buttonContainer}
      />
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
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
    marginHorizontal: 20,
    marginBottom: 30,
  },
});

export default Checkout;
