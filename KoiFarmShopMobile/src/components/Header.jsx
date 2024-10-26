// Header.js
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ drawerRef }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => drawerRef.current.openDrawer()}>
        <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/logo-ca-koi.png')} 
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,  // Đặt chiều cao cụ thể cho Header
    backgroundColor: '#470101',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'center',
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    padding: 10,
    width: 50,
    zIndex: 1,
  }
});