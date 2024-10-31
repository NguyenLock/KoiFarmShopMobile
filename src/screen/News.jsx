import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function News({ navigation }) {

  const data = [
    {
      id: '1',
      title: 'Koi Farms in Japan',
      date: 'Sun 03, 2020',
      description: 'Originating from a love for Japanese Koi fish, these fish not only impress with their vibrant beauty and bright colors but also carry deep feng shui values. Koi fish symbolize resilience, luck, and growth in life. Each type of Koi fish has its own meaning, reflecting human aspirations and desires, making them a popular choice for landscape decoration and creating relaxing spaces. The appeal of Koi fish lies not only in their appearance but also in the spiritual values they bring.',
      author: 'Koi Quang Minh',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4b9v7aEUi9OICVrd9kCn3c6XTtYjrq9eRnA&s',
    },
    {
      id: '2',
      title: 'The Meaning of Keeping Koi Fish According to Feng Shui Experts',
      date: 'Mon 25, 2020',
      description: 'Koi fish have long been considered a symbol of luck, prosperity, and longevity in Eastern culture, representing perseverance and strength. Legend has it that when a Koi fish successfully climbs the waterfall, it transforms into a dragon—a noble symbol in East Asian culture, representing effort and overcoming challenges. Each color of Koi fish has its own feng shui meaning: red Koi represents love, yellow Koi represents wealth, and white Koi symbolizes peace. In feng shui, the water flow in a Koi fish pond represents the flow of wealth and health. Nowadays, Koi fish are not only a noble hobby but are also kept to attract luck and wealth, becoming a part of life for many families in Asia and around the world.',
      author: 'Koi Quang Nhat',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyiawRQexXqYeSMuhcUclHPe6hniwgRGONJQ&s',
    },
    {
      id: '3',
      title: 'Popular Types of Koi Fish and Their Meanings',
      date: 'Thu 25, 2020',
      description: 'Koi fish, a symbol of resilience and luck, are among the most popular ornamental fish. There are different types of Koi fish, each with its own feng shui meaning: White Koi with red spots represents purity and renewal. White Koi with red and black spots represents resilience and growth. Black Koi with white spots symbolizes balance and harmony. Black Koi with red and white spots represents strength and power. Blue and red Koi represents peace and happiness. These types of Koi fish are not only beautiful but also bring good luck to those who own them.',
      author: 'Koi Quang Trinh',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXecE-soHFxZGxjBjo_BFSr_JjbSwGb5j_w&s',
    },
    {
      id: '4',
      title: 'How to Properly Care for Koi Fish',
      date: 'Sat 25, 2020',
      description: 'Detailed guide on how to care for and raise Koi fish at home: Choose a tank that is suitable for the number of fish. A filtration system is recommended to keep the water clean. Regularly check water quality. Maintain a pH level between 6.5 and 7.5, and change the water regularly. Provide specialized food for Koi fish, avoiding overfeeding to prevent water pollution. Keep the water temperature stable, around 18-24°C, for healthy growth. Monitor the fish’s health, detect signs of illness early, and provide timely treatment.',
      author: 'Koi Gia Minh',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPSdAmbaGwgAT8-1UR_WNBFh3jAuKdxfCLgw&s',
    },
    {
      id: '5',
      title: 'Koi Fish Care Tips for Beginners',
      date: 'Sun 25, 2020',
      description: 'Important tips for beginners in Koi fish care: Ensure a good filtration system. Maintain a pH level between 6.5 and 7.5. Use specialized food and avoid overfeeding. Keep the temperature between 18-24°C. Detect signs of illness early. Avoid overcrowding. Place stones or plants in the tank. These tips will help you successfully care for Koi fish!',
      author: 'Koi Gia Huy',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP6P83Qvm2LKj27rK_LXlC6fr3wl5r0SRp6A&s',
    },
  ];

  const NewsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailNews', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.footer}>
        <View style={styles.fishIcon}>
          <Text><Ionicons name="fish" size={17} color="#802b00" /> </Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>
        <Text style={styles.date}> <Fontisto name="date" size={14} color="black" /> {item.date}</Text>
      </View>
      <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <NewsItem item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  )

}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#e6e6e6',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  author: {
    fontSize: 15,
    color: '#802b00',
    textAlign: 'center',
    marginLeft: 3
  },
  date: {
    fontSize: 13,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#000',
    overflow: 'hidden',
  },
  fishIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
