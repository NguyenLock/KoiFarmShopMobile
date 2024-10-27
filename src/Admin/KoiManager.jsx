import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function KoiManager() {
  const [fishes, setFishes] = useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    const getKoiFishes = async () => {
      const response = await fetch(
        "https://6717c8cdb910c6a6e029f8dd.mockapi.io/koiData/koiData"
      );
      const data = await response.json();
      setFishes(data);
    };

    getKoiFishes();
  }, []);

  const renderFishItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigate.navigate("Detail", { koi: item })}
      style={styles.fishContainer}
    >
      <View style={styles.fishCard}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text style={styles.fishName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Koi Management</Text>
      <FlatList
        data={fishes}
        renderItem={renderFishItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  list: {
    paddingBottom: 20,
  },
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
});
