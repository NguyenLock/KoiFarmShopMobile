import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'

export default function Header() {
    
  return (
    <View style={styles.header}>
        <Image source={require('../../assets/logo-ca-koi.png')} style={styles.logo}/>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
    width: '100%',
    height:'auto',
    backgroundColor: '#470101', 
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode:'center',
    alignSelf:'center',
  }
})