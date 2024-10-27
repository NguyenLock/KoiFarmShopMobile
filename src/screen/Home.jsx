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
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const windowWidth = Dimensions.get('window').width;
const ASPECT_RATIO = 16 / 9;

const images = [
  require('../../assets/koiEat.jpg'),
  require('../../assets/imgKoi1.jpg'), 
  require('../../assets/imgKoi2.jpg'),
  require('../../assets/imgKoi3.jpg'),
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); 
    }, 3000); 

    return () => clearInterval(interval); 
  }, [currentIndex]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
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
        <Text style={styles.title}>GIỚI THIỆU</Text>
        <Text style={styles.subtitle}>về Koi Japan-VN</Text>
        <Text style={styles.content}>
          Cá koi Nhật Bản là cá koi thuần chủng được nhập trực tiếp từ các trang trại cá koi Nhật Bản về Việt Nam.
        </Text>
        <Text style={styles.content}>
          Koi là một loại cá chép đã được thuần hóa, lai tạo và được ưa chuộng tại Nhật Bản để làm cảnh. Bên cạnh vẻ đẹp nổi bật, cá koi còn được biết đến là một loại cá mang lại sự tốt lành, luôn mang lại may mắn cho người nuôi.
        </Text>
        <Text style={styles.content}>
          Siêu Thị Cá Koi VN chuyên cung cấp cho khách hàng những cá koi chất lượng, với các giống được chọn lọc từ các trại nổi tiếng.
        </Text>
      </View>

      {/* Carousel Section */}
      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={handlePrevious} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.carouselImage} />
          )}
        />

        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  carouselImage: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
