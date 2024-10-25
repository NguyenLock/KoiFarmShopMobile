import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem("cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };
    loadCart();
  }, []);

  const toggleCart = async (item) => {
    let updatedCart = [...cart];
    if (updatedCart.some((c) => c.id === item.id)) {
      updatedCart = updatedCart.filter((c) => c.id !== item.id);
    } else {
      updatedCart.push(item);
    }
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
  };

  const saveOrder = async (orderDetails) => {
    const order = {
      id: new Date().getTime(),
      items: cart,
      details: orderDetails,
    };
    let orders = await AsyncStorage.getItem("orders");
    orders = orders ? JSON.parse(orders) : [];
    orders.push(order);
    await AsyncStorage.setItem("orders", JSON.stringify(orders));
  };

  const getOrders = async () => {
    const orders = await AsyncStorage.getItem("orders");
    return orders ? JSON.parse(orders) : [];
  };

  return (
    <CartContext.Provider
      value={{ cart, toggleCart, clearCart, saveOrder, getOrders }}
    >
      {children}
    </CartContext.Provider>
  );
};
