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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createNativeStackNavigator();
const ProductStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Component chính cho Home với Drawer
const HomeWithDrawer = ({ navigation }) => {
  const drawer = useRef(null);

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <View style={styles.drawerContent}>
        <Text 
          style={styles.drawerItem} 
          onPress={() => {
            navigation.navigate('HomeMain');
            drawer.current.closeDrawer();
          }}>
          Home
        </Text>
        <Text 
          style={styles.drawerItem} 
          onPress={() => {
            navigation.navigate('AboutUs');
            drawer.current.closeDrawer();
          }}>
          About Us
        </Text>
        <Text 
          style={styles.drawerItem} 
          onPress={() => {
            navigation.navigate('ContactUs');
            drawer.current.closeDrawer();
          }}>
          Contact Us
        </Text>
        <Text 
          style={styles.drawerItem} 
          onPress={() => {
            navigation.navigate('News');
            drawer.current.closeDrawer();
          }}>
          News
        </Text>
      </View>
    </View>
  );

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
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen 
        name="AboutUs" 
        component={AboutUs}
        options={{
          headerShown: false
          
        }}
      />
      <HomeStack.Screen 
        name="ContactUs" 
        component={ContactUs}
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen 
        name="News" 
        component={News}
        options={{
          title: 'News',
          headerStyle: {
            backgroundColor: '#470101',
          },
          headerTintColor: '#fff',
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
          title: 'Products',
          headerStyle: {
            backgroundColor: '#470101',
          },
          headerTintColor: '#fff',
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
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#470101',
          },
          headerTintColor: '#fff',
        }}
      />
    </ProfileStack.Navigator>
  );
}

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
          tabBarStyle: {
            height: 60,
            paddingBottom: 5,
          }
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStackScreen}
        />
        <Tab.Screen 
          name="Products" 
          component={ProductStackScreen}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileStackScreen}
        />
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