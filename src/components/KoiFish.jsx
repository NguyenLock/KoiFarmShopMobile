import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function KoiFish({ item }) {
  const { toggleCart, currentUser, cart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!currentUser) {
      Alert.alert("Login Required", "Please login to add items to your cart.");
      return;
    }
    toggleCart(item);
    Alert.alert("Cart Updated", `${item.name} added to cart.`);
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cart.find((c) => c.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < rating ? "star" : "star-outline"}
          size={16}
          color="gold"
        />
      );
    }
    return stars;
  };

  const quantity = getItemQuantity(item.id);
  const averageRating = getAverageRating(item.reviews);

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {item.breed}
          </Text>
          <View style={styles.ratingContainer}>
            {renderStars(averageRating)}
            <Text style={styles.ratingText}>{averageRating}</Text>
          </View>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleAddToCart}
        style={styles.addToCartButton}
      >
        <Ionicons name="cart-outline" size={20} color="white" />
        <Text style={styles.addToCartText}>
          {quantity > 0 ? `In Cart: ${quantity}` : "Add to Cart"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: 10,
  },
  infoRow: {
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15, // Space between image and info
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5c0202",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5c0202",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
    width: "100%", // Makes the button full width
    alignSelf: "center",
  },
  addToCartText: {
    marginLeft: 5,
    fontSize: 16,
    color: "white",
  },
});
