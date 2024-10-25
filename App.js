import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./src/navigations/TabNavigation";
import { CartProvider } from "./src/contexts/CartContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Checkout from "./src/Customers/Checkout";
import History from "./src/Customers/History";
import AwardCertificate from "./src/Customers/AwardCertificate";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              title: "Checkout",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#470101",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="History"
            component={History}
            options={{
              title: "Transaction",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#470101",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Certificate"
            component={AwardCertificate}
            options={{
              title: "Certificate",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#470101",
              },
              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
