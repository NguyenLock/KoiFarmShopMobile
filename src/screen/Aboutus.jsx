import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';

export default function Aboutus() {
  return (
    <ScrollView style={styles.container}>
      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Image 
          source={require('../../assets/logo-ca-koi.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Koi Japan-VN</Text>
        <Text style={styles.subtitle}>Sharing the beauty of nature</Text>
      </View>

      {/* Our Story Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.text}>
          Founded in 2020, CaKoi Farm began from a passion for beautiful Koi fish.
          We started with a small farm and a big love for this Japanese fish, and today, 
          we are proud to supply high-quality Koi fish to customers everywhere.
        </Text>
      </View>

      {/* Our Mission Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          The mission of CaKoi Farm is to bring joy and relaxation to people through 
          the beauty of Koi fish. We are committed to providing healthy, vibrant fish 
          and attentive consulting services for our customers.
        </Text>
      </View>

      {/* Our Values Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        <View style={styles.valueItem}>
          <Text style={styles.valueTitle}>Quality</Text>
          <Text style={styles.text}>
            We carefully select each fish to ensure excellent health and beauty.
          </Text>
        </View>
        <View style={styles.valueItem}>
          <Text style={styles.valueTitle}>Professionalism</Text>
          <Text style={styles.text}>
            Our team has deep knowledge and is always ready to offer advice.
          </Text>
        </View>
        <View style={styles.valueItem}>
          <Text style={styles.valueTitle}>Customer First</Text>
          <Text style={styles.text}>
            We put customer satisfaction first and are always here for you.
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visit Us</Text>
        <Text style={styles.contactText}>Address: 123 Koi Fish Farm, District 9, Ho Chi Minh City</Text>
        <Text style={styles.contactText}>Phone: (84) 123-456-789</Text>
        <Text style={styles.contactText}>Email: info@cakoi.com</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 CaKoi Farm. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    backgroundColor: '#470101',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#470101',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  valueItem: {
    marginBottom: 15,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#470101',
    marginBottom: 5,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});
