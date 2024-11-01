import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [personalOrders, setPersonalOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem("cart" + currentUser?.id);
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };
    loadCart();
  }, [currentUser?.id]);

  useEffect(() => {
    const loadPersonalOrders = async () => {
      const response = await AsyncStorage.getItem("orders" + currentUser?.id);
      const storedPersonalOrders = response ? JSON.parse(response) : [];

      storedPersonalOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPersonalOrders(storedPersonalOrders);
    };
    loadPersonalOrders();
  }, [currentUser?.id]);

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
    setCart([]);
    setPersonalOrders([]);
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
    await AsyncStorage.setItem(
      "cart" + currentUser?.id,
      JSON.stringify(updatedCart)
    );
  };

  const removeFromCart = async (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    await AsyncStorage.setItem(
      "cart" + currentUser?.id,
      JSON.stringify(updatedCart)
    );
  };

  const removeMultipleFromCart = async (itemIds) => {
    const updatedCart = cart.filter((item) => !itemIds.includes(item.id));
    setCart(updatedCart);
    await AsyncStorage.setItem(
      "cart" + currentUser?.id,
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = async (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    await AsyncStorage.setItem(
      "cart" + currentUser?.id,
      JSON.stringify(updatedCart)
    );
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
    await AsyncStorage.setItem(
      "cart" + currentUser?.id,
      JSON.stringify(updatedCart)
    );
  };

  const clearCart = async () => {
    setCart([]);
    await AsyncStorage.removeItem("cart" + currentUser?.id);
  };

  const clearOrders = async () => {
    setOrders([]);
    await AsyncStorage.removeItem("orders");
    const response = await fetch(
      "https://6715cc1b33bc2bfe40bb27f5.mockapi.io/users"
    );
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      await AsyncStorage.removeItem("orders" + data[i].id);
    }
  };

  const saveOrder = async (orderDetails, total) => {
    const order = {
      id: new Date().getTime(),
      items: cart,
      details: orderDetails,
      total: total,
      status: orderDetails.consignment ? "Consignment" : "Pending",
      createdAt: new Date(),
    };

    const updatedOrders = [...orders, order];
    const updatedPersonalOrders =
      order.details.userId === currentUser?.id
        ? [...personalOrders, order]
        : [...personalOrders];

    setOrders(updatedOrders);
    setPersonalOrders(updatedPersonalOrders);
    await AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));
    await AsyncStorage.setItem(
      "orders" + currentUser?.id,
      JSON.stringify(updatedPersonalOrders)
    );
    clearCart();
  };

  const updateOrderStatus = async (orderId, newStatus, userId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    await AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));

    let personalOrders = await AsyncStorage.getItem("orders" + userId);
    personalOrders = personalOrders ? JSON.parse(personalOrders) : [];

    const updatedPersonalOrders = personalOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    await AsyncStorage.setItem(
      "orders" + userId,
      JSON.stringify(updatedPersonalOrders)
    );
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
        personalOrders,
        setPersonalOrders,
        setUser,
        logout,
        toggleCart,
        removeFromCart,
        removeMultipleFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        clearOrders,
        saveOrder,
        saveComment,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
