import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const ASPECT_RATIO = 16 / 9;
const ITEM_WIDTH = windowWidth * 0.8;
const SPACING = 10;

const originalImages = [
  require('../../assets/koiEat.jpg'),
  require('../../assets/imgKoi1.jpg'), 
  require('../../assets/imgKoi2.jpg'),
  require('../../assets/imgKoi3.jpg'),
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  
  // Add duplicate images for smooth scrolling
  const getExtendedImages = () => {
    return [
      originalImages[originalImages.length - 1],
      ...originalImages,
      originalImages[0]
    ];
  };

  const [images] = useState(getExtendedImages());

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: 1,
      animated: false
    });
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const autoScroll = setInterval(() => {
      const nextIndex = (activeIndex + 1) % (images.length - 2) + 1;
      
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      });
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [activeIndex]);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (ITEM_WIDTH + SPACING));
    setActiveIndex(index);

    if (index === 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: images.length - 2,
          animated: false
        });
        setActiveIndex(images.length - 2);
      }, 300);
    } else if (index === images.length - 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: 1,
          animated: false
        });
        setActiveIndex(1);
      }, 300);
    }
  };

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItemContainer}>
        <Image source={item} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <ScrollView>
      {/* Banner Section */}
      <View style={styles.container}>
        <Image
          source={require('../../assets/bannerKoi.jpg')}
          style={styles.banner}
          resizeMode="cover"
        />
      </View>

      {/* Introduction Section */}
      <View style={styles.introContainer}>
        <Text style={styles.title}>INTRODUCTION</Text>
        <Text style={styles.subtitle}>About Koi Japan-VN</Text>
        <Text style={styles.content}>
          Japanese Koi fish are purebred Koi imported directly from Japanese Koi farms to Vietnam.
        </Text>
        <Text style={styles.content}>
          Koi is a type of carp that has been domesticated, bred, and is highly valued in Japan as ornamental fish. Besides its outstanding beauty, Koi fish are also known to bring good fortune and are believed to bring luck to the keeper.
        </Text>
        <Text style={styles.content}>
          Koi Fish Supermarket VN specializes in providing customers with quality Koi fish, selected from renowned farms.
        </Text>
      </View>

      {/* Carousel Section */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderCarouselItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH + SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(data, index) => ({
            length: ITEM_WIDTH + SPACING,
            offset: (ITEM_WIDTH + SPACING) * index,
            index,
          })}
          initialScrollIndex={1}
        />
      </View>

      {/* Navigation Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Aboutus')}
        >
          <Text style={styles.navButtonText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('ContactUs')}
        >
          <Text style={styles.navButtonText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('News')}
        >
          <Text style={styles.navButtonText}>News</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  banner: {
    width: windowWidth,
    height: windowWidth / ASPECT_RATIO,
    marginBottom: 10,
  },
  introContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
    textAlign: 'justify',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  navButton: {
    backgroundColor: '#470101',
    padding: 15,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carouselContainer: {
    marginVertical: 20,
  },
  carouselContent: {
    paddingHorizontal: (windowWidth - ITEM_WIDTH) / 2,
  },
  carouselItemContainer: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING / 2,
    borderRadius: 15,
    backgroundColor: '#000',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  carouselImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.2,
    resizeMode: 'cover',
  }
});
