import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function KoiFish({ item, onToggleAddToCart, isAddToCart }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          onPress={onToggleAddToCart}
          style={[
            styles.addToCartButton,
            isAddToCart && styles.addedToCartButton,
          ]}
        >
          <Ionicons
            name={isAddToCart ? "checkmark-outline" : "cart-outline"}
            size={20}
            color="white"
          />
          <Text style={styles.addToCartText}>
            {isAddToCart ? "Added" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "stretch",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 18,
    color: "#470101",
    marginTop: 5,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#470101",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  addedToCartButton: {
    backgroundColor: "green",
  },
  addToCartText: {
    marginLeft: 5,
    fontSize: 16,
    color: "white",
  },
});
