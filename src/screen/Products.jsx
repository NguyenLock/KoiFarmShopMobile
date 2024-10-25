import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import KoiFish from "../components/KoiFish";
import { Ionicons } from "@expo/vector-icons";

export default function Products({ navigation }) {
  const [fishes, setFishes] = useState([]);
  const [filteredFishes, setFilteredFishes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { cart, toggleCart } = useContext(CartContext);

  const getKoiFishes = async () => {
    setLoading(true);
    const response = await fetch(
      "https://6717c8cdb910c6a6e029f8dd.mockapi.io/koiData/koiData"
    );
    const data = await response.json();
    setFishes(data);
    setFilteredFishes(data);
    setBreeds([...new Set(data.map((item) => item.breed))]); // Extract unique breeds
    setLoading(false);
  };

  const handleSearch = () => {
    if (search) {
      const filteredData = fishes.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFishes(filteredData);
    } else {
      setFilteredFishes(fishes);
    }
  };

  const handleFilterByBreed = (breed) => {
    setSelectedBreed(breed);
    if (breed) {
      const filteredData = fishes.filter((item) => item.breed === breed);
      setFilteredFishes(filteredData);
    } else {
      setFilteredFishes(fishes);
    }
  };

  const handleFilterButtonPress = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    getKoiFishes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Koi Collection</Text>
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="cart-outline" size={24} color="black" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search koi..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
            <Ionicons name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterButtonPress}
        >
          <Ionicons
            name="filter"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {isVisible && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <TouchableOpacity
            style={[
              styles.breedButton,
              selectedBreed === "" && styles.selectedBreedButton,
            ]}
            onPress={() => handleFilterByBreed("")}
          >
            <Text
              style={[
                styles.breedButtonText,
                selectedBreed === "" && styles.selectedBreedButtonText,
              ]}
            >
              All Breeds
            </Text>
          </TouchableOpacity>
          {breeds.map((breed) => (
            <TouchableOpacity
              key={breed}
              style={[
                styles.breedButton,
                selectedBreed === breed && styles.selectedBreedButton,
              ]}
              onPress={() => handleFilterByBreed(breed)}
            >
              <Text
                style={[
                  styles.breedButtonText,
                  selectedBreed === breed && styles.selectedBreedButtonText,
                ]}
              >
                {breed}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : filteredFishes.length === 0 ? (
          <View style={styles.containerNothing}>
            <Text>No Koi fish found.</Text>
          </View>
        ) : (
          <FlatList
            style={styles.list}
            data={filteredFishes}
            keyExtractor={(item) => item.id.toString()} // Ensuring unique key as a string
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", { koi: item })}
              >
                <KoiFish
                  item={item}
                  onToggleAddToCart={() => toggleCart(item)}
                  isAddToCart={cart.some((c) => c.id === item.id)}
                  iconName="add-outline" // Pass the plus icon name as a prop
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  containerNothing: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cartIcon: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 3,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    padding: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#3B7B7A",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 5,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    height: 45,
  },
  breedButton: {
    padding: 8,
    backgroundColor: "#e4e4e4",
    borderRadius: 10,
    marginHorizontal: 5,
    height: 40,
    justifyContent: "center",
  },
  selectedBreedButton: {
    backgroundColor: "gray",
  },
  breedButtonText: {
    color: "#000",
  },
  selectedBreedButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 15,
    marginTop: 15,
    paddingBottom: 20,
  },
  list: {
    flex: 1,
  },
});
