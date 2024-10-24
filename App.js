// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, DrawerLayoutAndroid, TouchableOpacity } from 'react-native';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import { useRef, useState } from 'react';
import Home from './src/screen/Home';
import AboutUs from './src/screen/Aboutus';
import ContactUs from './src/screen/ContactUs';
import News from './src/screen/News';
import Profile from './src/Customers/Profile';
import Products from './src/screen/Products';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
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
      case 'Profile':
        return <Profile />;
      case 'Products':
        return <Products />;
      default:
        return <Home />;
    }
  };

  const showHeader = ['Home', 'AboutUs', 'ContactUs', 'News'].includes(currentScreen);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        {showHeader && (
          <View style={styles.containerHeader}>
            <Header drawerRef={drawer} />
          </View>
        )}
        <View style={styles.content}>
          {renderScreen()}
        </View>
        <View style={styles.bottomTab}>
          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setCurrentScreen('Home')}>
            <Ionicons 
              name="home" 
              size={24} 
              color={currentScreen === 'Home' ? '#470101' : '#666'} 
            />
            <Text style={[
              styles.tabText, 
              {color: currentScreen === 'Home' ? '#470101' : '#666'}
            ]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setCurrentScreen('Products')}>
            <Ionicons 
              name="cart" 
              size={24} 
              color={currentScreen === 'Products' ? '#470101' : '#666'} 
            />
            <Text style={[
              styles.tabText, 
              {color: currentScreen === 'Products' ? '#470101' : '#666'}
            ]}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setCurrentScreen('Profile')}>
            <Ionicons 
              name="person" 
              size={24} 
              color={currentScreen === 'Profile' ? '#470101' : '#666'} 
            />
            <Text style={[
              styles.tabText, 
              {color: currentScreen === 'Profile' ? '#470101' : '#666'}
            ]}>Profile</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </DrawerLayoutAndroid>
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
  bottomTab: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
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