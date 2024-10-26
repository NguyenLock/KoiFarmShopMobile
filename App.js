import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, DrawerLayoutAndroid } from "react-native";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Home from "./src/screen/Home";
import AboutUs from "./src/screen/Aboutus";
import ContactUs from "./src/screen/ContactUs";
import News from "./src/screen/News";
import Profile from "./src/Customers/Profile";
import Products from "./src/screen/Products";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { CartProvider } from "./src/contexts/CartContext";
import Checkout from "./src/Customers/Checkout";
import History from "./src/Customers/History";
import Detail from "./src/screen/Detail";

const Stack = createNativeStackNavigator();
import AwardCertificate from "./src/Customers/AwardCertificate";
import TabNavigation from "./src/navigations/TabNavigation";

const HomeStack = createNativeStackNavigator();
const ProductStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeWithDrawer = ({ navigation }) => {
  const drawer = useRef(null);

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <View style={styles.drawerContent}>
        <Text
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate("HomeMain");
            drawer.current.closeDrawer();
          }}
        >
          Home
        </Text>
        <Text
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate("AboutUs");
            drawer.current.closeDrawer();
          }}
        >
          About Us
        </Text>
        <Text
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate("ContactUs");
            drawer.current.closeDrawer();
          }}
        >
          Contact Us
        </Text>
        <Text
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate("News");
            drawer.current.closeDrawer();
          }}
        >
          News
        </Text>
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Header drawerRef={drawer} />
        </View>
        <View style={styles.content}>
          <Home navigation={navigation} />
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeWithDrawer}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="News"
        component={News}
        options={{
          title: "News",
          headerStyle: { backgroundColor: "#470101" },
          headerTintColor: "#fff",
        }}
      />
    </HomeStack.Navigator>
  );
}

function ProductStackScreen() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="ProductsList"
        component={Products}
        options={{
          title: "Products",
          headerStyle: { backgroundColor: "#470101" },
          headerTintColor: "#fff",
        }}
      />
    </ProductStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileMain"
        component={Profile}
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: "#470101" },
          headerTintColor: "#fff",
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            name="Tabs"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
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
          <MainStack.Screen
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
          <MainStack.Screen
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
          <MainStack.Screen
            name="Detail"
            component={Detail}
            options={{ title: "Koi Detail" }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawerContainer: { flex: 1, paddingTop: 50 },
  drawerTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  drawerContent: { marginLeft: 10 },
  drawerItem: { fontSize: 18, marginBottom: 10 },
  containerHeader: { height: 60 },
  content: { flex: 1 },
});
