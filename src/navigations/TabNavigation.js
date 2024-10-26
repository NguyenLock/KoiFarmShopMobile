import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../contexts/CartContext";
import Products from "../screen/Products";
import Cart from "../Customers/Cart";
import Profile from "../Customers/Profile";
import DrawerNavigation from "./DrawerNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { cart } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Products") {
            iconName = focused ? "fish" : "fish-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#470101",
        tabBarInactiveTintColor: "#666",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={DrawerNavigation}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          title: "Koi Fishes",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#470101",
          },
          headerTintColor: "#fff",
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          title: "Cart",
          headerShown: true,
          tabBarBadge: cart.length,
          headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#470101",
            },
            headerTintColor: "#fff",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#470101",
          },
          headerTintColor: "#fff",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;