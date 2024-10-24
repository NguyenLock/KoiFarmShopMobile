// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, DrawerLayoutAndroid } from 'react-native';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import { useRef, useState } from 'react';
import Home from './src/screen/Home';
import AboutUs from './src/screen/Aboutus';
import ContactUs from './src/screen/ContactUs';
import News from './src/screen/News';
import Profile from './src/Customers/Profile';
import Products from './src/screen/Products';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const drawer = useRef(null);
  const [currentScreen, setCurrentScreen] = useState('Home');

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <View style={styles.drawerContent}>
        <Text 
          style={styles.drawerItem} 
          onPress={() => {
            setCurrentScreen('Home');
            drawer.current.closeDrawer();
          }}>
          Home
        </Text>
        <Text 
          style={styles.drawerItem} 
          onPress={() => {
            setCurrentScreen('AboutUs');
            drawer.current.closeDrawer();
          }}>
          About Us
        </Text>
        <Text 
          style={styles.drawerItem} 
          onPress={() => {
            setCurrentScreen('ContactUs');
            drawer.current.closeDrawer();
          }}>
          Contact Us
        </Text>
        <Text 
          style={styles.drawerItem} 
          onPress={() => {
            setCurrentScreen('News');
            drawer.current.closeDrawer();
          }}>
          News
        </Text>
      </View>
    </View>
  );

  const renderScreen = () => {
    switch(currentScreen) {
      case 'Home':
        return <Home />;
      case 'AboutUs':
        return <AboutUs />;
      case 'ContactUs':
        return <ContactUs />;
      case 'News':
        return <News />;
      default:
        return <Home />;
    }
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Header drawerRef={drawer} />
        </View>
        <View style={styles.content}>
          {renderScreen()}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Products') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#470101',
          tabBarInactiveTintColor: '#666',
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="Products" component={Products} options={{ title: 'Products'}}/>
        <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#470101',
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    fontSize: 16,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  }
});