import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem("cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };
    loadCart();
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      const response = await AsyncStorage.getItem("orders");
      const storedOrders = response ? JSON.parse(response) : [];
      storedOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(storedOrders);
    };
    loadOrders();
  }, []);

  const toggleCart = async (item) => {
    let updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((c) => c.id === item.id);

    if (existingItemIndex > -1) {
      updatedCart.splice(existingItemIndex, 1);
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = async (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = async (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = async () => {
    setCart([]);
    await AsyncStorage.removeItem("cart");
  };

  const saveOrder = async (orderDetails, total) => {
    const order = {
      id: new Date().getTime(),
      items: cart,
      details: orderDetails,
      total: total,
      status: "Pending",
      createdAt: new Date(),
    };
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    await AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const getOrders = async () => {
    const storedOrders = await AsyncStorage.getItem("orders");
    setOrders(storedOrders ? JSON.parse(storedOrders) : []);
  };

  const clearOrders = async () => {
    setOrders([]);
    await AsyncStorage.removeItem("orders");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        toggleCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        saveOrder,
        getOrders,
        clearOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
