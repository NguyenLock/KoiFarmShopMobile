import React, { useState, useRef } from "react";
import { View, Text, DrawerLayoutAndroid, StyleSheet } from "react-native";
import Home from "../screen/Home";
import Aboutus from "../screen/Aboutus";
import ContactUs from "../screen/ContactUs";
import News from "../screen/News";
import Header from "../components/Header";

const DrawerNavigation = () => {
  const drawer = useRef(null);
  const [currentScreen, setCurrentScreen] = useState("Home");

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <View style={styles.drawerContent}>
        {["Home", "About Us", "Contact Us", "News"].map((screen) => (
          <Text
            key={screen}
            style={styles.drawerItem}
            onPress={() => {
              setCurrentScreen(screen);
              drawer.current.closeDrawer();
            }}
          >
            {screen}
          </Text>
        ))}
      </View>
    </View>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case "Home":
        return <Home />;
      case "About Us":
        return <Aboutus />;
      case "Contact Us":
        return <ContactUs />;
      case "News":
        return <News />;
      default:
        return <Home />;
    }
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <Header drawerRef={drawer} />
        <View style={styles.content}>{renderScreen()}</View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    height: 100,
  },
  content: {
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#470101",
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    fontSize: 16,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default DrawerNavigation;
