import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import KoiFish from "../components/KoiFish";

export default function Products() {
  const [fishes, setFishes] = useState([]);
  const { cart, toggleCart } = useContext(CartContext);

  getKoiFishes = async () => {
    const response = await fetch(
      "https://6717c8cdb910c6a6e029f8dd.mockapi.io/koiData/koiData"
    );
    const data = await response.json();
    setFishes(data);
  };

  useEffect(() => {
    getKoiFishes();
  }, []);

  return (
    <View style={styles.container}>
      {fishes.length === 0 ? (
        <View style={styles.containerNothing}>
          <Text>No Koi fish found.</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={fishes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <KoiFish
              item={item}
              onToggleAddToCart={() => toggleCart(item)}
              isAddToCart={cart.some((c) => c.id === item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginVertical: 10,
  },
  containerNothing: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  filterButton: {
    padding: 10,
  },
  scrollContainer: {
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#e4e4e4",
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "#000",
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
