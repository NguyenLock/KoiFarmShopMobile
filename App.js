import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

export default function App() {
  return (
    <>
    <View style={styles.containerHeader}>
      <Header/>
    </View>
    <View>
      <Footer style={styles.containerFooter}/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerHeader:{
    flex:1
  },
  containerFooter:{}
});
