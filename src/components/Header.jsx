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
      <Image 
        source={require('../../assets/logo-ca-koi.png')} 
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    backgroundColor: '#470101',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  menuButton: {
    padding: 10,
  }
});