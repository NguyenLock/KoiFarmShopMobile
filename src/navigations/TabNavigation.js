import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../contexts/CartContext";
import Products from "../screen/Products";
import Profile from "../Customers/Profile";
import DrawerNavigation from "./DrawerNavigation";
import AdminPage from "../Admin/AdminPage";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { currentUser } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Products") {
            iconName = focused ? "fish" : "fish-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Admin") {
            iconName = focused ? "home" : "home-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#470101",
        tabBarInactiveTintColor: "#666",
        headerShown: false,
      })}
    >
      {currentUser?.role !== "admin" && (
        <>
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
        </>
      )}
      {currentUser?.role === "admin" && (
        <Tab.Screen
          name="Admin"
          component={AdminPage}
          options={{
            title: "Admin Page",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#470101",
            },
            headerTintColor: "#fff",
          }}
        />
      )}
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
