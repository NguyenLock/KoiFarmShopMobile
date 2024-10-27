import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from "./src/contexts/CartContext";
import Checkout from "./src/Customers/Checkout";
import History from "./src/Customers/History";
import Detail from "./src/screen/Detail";
import AwardCertificate from "./src/Customers/AwardCertificate";
import TabNavigation from "./src/navigations/TabNavigation";
import Dashboard from "./src/Admin/Dashboard";
import CustomerManager from "./src/Admin/CustomerManager";
import KoiManager from "./src/Admin/KoiManager";
import OrderManager from "./src/Admin/OrderManager";
import Login from "./src/screen/Login";
import Register from "./src/screen/Register";
import Aboutus from "./src/screen/Aboutus";
import ContactUs from "./src/screen/ContactUs";
import News from "./src/screen/News";

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
            name="Login"
            component={Login}
            options={{
              title: "Login",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#470101" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Register",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#470101" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              title: "Checkout",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#470101" },
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
              headerStyle: { backgroundColor: "#470101" },
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
              headerStyle: { backgroundColor: "#470101" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              title: "Koi Detail",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#470101",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: "Dashboard",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#470101",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="CustomerManagement"
            component={CustomerManager}
            options={{
              title: "Customer Management",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#470101",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="KoiManagement"
            component={KoiManager}
            options={{
              title: "Koi Management",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#470101",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="OrderManagement"
            component={OrderManager}
            options={{
              title: "Order Management",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#470101",
              },
              headerTintColor: "#fff",
            }}
          />
           <Stack.Screen
            name="Aboutus"
            component={Aboutus}
            options={{
              title: "AboutUs",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#470101" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ContactUs"
            component={ContactUs}
            options={{
              title: "Contact Us",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#470101" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="News"
            component={News}
            options={{
              title: "News",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#470101" },
              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
