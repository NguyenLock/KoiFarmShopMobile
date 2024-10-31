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
import React, { useEffect, useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { CartContext } from "../contexts/CartContext";
import KoiFish from "../components/KoiFish";
import { Ionicons } from "@expo/vector-icons";
import { Chip, Searchbar } from "react-native-paper";

export default function Products({ navigation }) {
  const [fishes, setFishes] = useState([]);
  const [filteredFishes, setFilteredFishes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Add visibility state for filter options
  const { cart, currentUser } = useContext(CartContext);

  const getKoiFishes = async () => {
    setLoading(true);
    const response = await fetch(
      "https://6717c8cdb910c6a6e029f8dd.mockapi.io/koiData/koiData"
    );
    const data = await response.json();
    setFishes(data);
    setFilteredFishes(data);
    setBreeds([...new Set(data.map((item) => item.breed))]);
    setLoading(false);
  };

  useEffect(() => {
    getKoiFishes();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  useFocusEffect(
    useCallback(() => {
      // Reset the filter state when the screen comes into focus
      setSelectedBreed("");
      setSearch("");
      setFilteredFishes(fishes);
      setIsVisible(false); // Hide filter options when screen comes into focus
    }, [fishes])
  );

  const handleSearch = () => {
    if (search) {
      const filteredData = fishes.filter((item) => {
        const searchTerm = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchTerm) ||
          item.breed.toLowerCase().includes(searchTerm) ||
          item.age.toString().includes(searchTerm) ||
          item.gender.toLowerCase().includes(searchTerm)
        );
      });
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

  const navigateToCart = () => {
    if (!currentUser) {
      navigation.navigate("Login");
      return;
    }
    navigation.navigate("Cart");
  };

  const handleFilterButtonPress = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Koi Collection</Text>
        <TouchableOpacity style={styles.cartIcon} onPress={navigateToCart}>
          <Ionicons name="cart-outline" size={24} color="black" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Search koi..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
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
          <Chip
            mode="outlined"
            selected={selectedBreed === ""}
            onPress={() => handleFilterByBreed("")}
            style={styles.chip}
          >
            All Breeds
          </Chip>
          {breeds.map((breed) => (
            <Chip
              key={breed}
              mode="outlined"
              selected={selectedBreed === breed}
              onPress={() => handleFilterByBreed(breed)}
              style={styles.chip}
            >
              {breed}
            </Chip>
          ))}
        </ScrollView>
      )}

      {search && (
        <View style={styles.searchResultsContainer}>
          <Text style={styles.searchResultsText}>
            {filteredFishes.length} result{filteredFishes.length !== 1 && "s"}{" "}
            found
          </Text>
        </View>
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
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", { koi: item })}
              >
                <KoiFish item={item} />
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
    backgroundColor: "#f9f9f9",
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
    color: "#333",
  },
  cartIcon: {
    position: "relative",
    padding: 10,
  },
  cartBadge: {
    position: "absolute",
    top: -3,
    right: -2,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
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
  searchInput: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#470101",
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
    paddingVertical: 10,
  },
  chip: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  searchResultsContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchResultsText: {
    fontSize: 16,
    color: "#333",
  },
  listContainer: {
    flex: 1,
    marginTop: 15,
    paddingBottom: 20,
  },
  list: {
    flex: 1,
  },
});
