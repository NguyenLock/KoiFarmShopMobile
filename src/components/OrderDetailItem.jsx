import { Image, StyleSheet, Text, View } from "react-native";

export default function OrderDetailItem({ item }) {
  return (
    <View key={item.id} style={styles.fishContainer}>
      <View style={styles.fishCard}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.fishName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: "#470101",
    marginHorizontal: 10,
  },
});
