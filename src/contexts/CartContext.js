import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);

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

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("currentUser");
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    };
    loadUser();
  }, []);

  const loadComments = async () => {
    const storedComments = await AsyncStorage.getItem("comments");
    setComments(storedComments ? JSON.parse(storedComments) : []);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const logout = async () => {
    setCurrentUser(null);
    await AsyncStorage.removeItem("currentUser");
  };

  const setUser = async (user) => {
    setCurrentUser(user);
    await AsyncStorage.setItem("currentUser", JSON.stringify(user));
  };

  const toggleCart = async (item) => {
    let updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((c) => c.id === item.id);

    if (existingItemIndex === -1) {
      updatedCart.push({ ...item, quantity: 1 });
    } else {
      updatedCart[existingItemIndex].quantity += 1;
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
    clearCart();
  };

  const saveComment = async (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    await AsyncStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        currentUser,
        comments,
        setUser,
        logout,
        toggleCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        saveOrder,
        saveComment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};