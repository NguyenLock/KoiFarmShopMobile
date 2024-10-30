import { useContext, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { CartContext } from "../contexts/CartContext";
import { Ionicons } from "@expo/vector-icons";

export default function Cart({ navigation }) {
  const {
    cart,
    removeFromCart,
    removeMultipleFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleLongPress = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleOutsidePress = () => {
    setSelectedItemId(null);
  };

  const handleClearCart = () => {
    clearCart();
    setModalVisible(false);
    Alert.alert("Cart cleared!", "All items have been removed from your cart.");
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelectedItems = async () => {
    await removeMultipleFromCart(selectedItems);
    setSelectedItems([]);
    setSelectAll(false);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const toggleCheckboxes = () => {
    if (showCheckboxes) {
      setSelectedItems([]);
      setSelectAll(false);
    }
    setShowCheckboxes(!showCheckboxes);
  };

  return (
    <View style={styles.container} onPress={handleOutsidePress}>
      {cart.length === 0 ? (
        <View style={styles.containerNothing}>
          <Text>No Koi fish in cart.</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.toggleCheckboxButton}
              onPress={toggleCheckboxes}
            >
              <Text style={styles.toggleCheckboxButtonText}>
                {showCheckboxes ? "Cancel" : "Select"}
              </Text>
            </TouchableOpacity>
            {showCheckboxes && (
              <CheckBox
                title="Select All"
                checked={selectAll}
                onPress={handleSelectAll}
                containerStyle={styles.selectAllCheckbox}
              />
            )}
          </View>

          <Pressable style={{ flex: 1 }} onPress={handleOutsidePress}>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.fishContainer}
                  onLongPress={() => handleLongPress(item.id)}
                  delayLongPress={500}
                  onPress={() => navigation.navigate("Detail", { koi: item })}
                >
                  <View style={styles.fishCard}>
                    {showCheckboxes && (
                      <CheckBox
                        checked={selectedItems.includes(item.id)}
                        onPress={() => handleSelectItem(item.id)}
                      />
                    )}
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
                        <TouchableOpacity
                          onPress={() => decreaseQuantity(item.id)}
                        >
                          <Ionicons
                            name="remove-circle-outline"
                            size={28}
                            color={item.quantity === 1 ? "#ccc" : "#470101"}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => increaseQuantity(item.id)}
                        >
                          <Ionicons
                            name="add-circle-outline"
                            size={28}
                            color="#470101"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {selectedItemId === item.id && (
                      <TouchableOpacity
                        onPress={() => {
                          removeFromCart(item.id);
                          handleOutsidePress();
                        }}
                        style={styles.removeButton}
                      >
                        <Ionicons name="trash" size={26} color="white" />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
            <View style={styles.footer}>
              <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={styles.checkoutText}>Go to Checkout</Text>
              </TouchableOpacity>
              {selectedItems.length > 0 && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDeleteSelectedItems}
                >
                  <Text style={styles.deleteButtonText}>Delete Selected</Text>
                </TouchableOpacity>
              )}
            </View>
          </Pressable>
        </>
      )}

      {cart.length > 1 && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.overlay}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Are you sure you want to clear cart?
                  </Text>
                  <Pressable
                    style={[styles.buttonOK, styles.modalButton]}
                    onPress={handleClearCart}
                  >
                    <Text style={styles.textStyle}>Yes, Clear All</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.buttonCancel, styles.modalButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Pressable
            style={styles.buttonDelete}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="trash" size={26} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginTop: 10,
  },
  containerNothing: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonDelete: {
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#470101",
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation: 5,
    zIndex: 10,
  },
  buttonOK: {
    backgroundColor: "red",
  },
  buttonCancel: {
    backgroundColor: "gray",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#470101",
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  toggleCheckboxButton: {
    backgroundColor: "#470101",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginStart: 10,
  },
  toggleCheckboxButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectAllCheckbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  fishContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  fishCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
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
  quantityButton: {
    backgroundColor: "#EEEEEE",
    borderRadius: 50,
    padding: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#470101",
    marginHorizontal: 10,
  },
  removeButton: {
    padding: 12,
    marginLeft: 10,
    backgroundColor: "#470101",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
