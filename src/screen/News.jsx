import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function News({ navigation }) {


  const data = [
    {
      id: '1',
      title: 'Các trại cá koi nhật bản (Koi Farm Japan)',
      date: 'Sun 03, 2020',
      description: 'Xuất phát từ tình yêu với cá Koi Nhật Bản, những giống cá này không chỉ gây ấn tượng với vẻ đẹp sống động và màu sắc rực rỡ, mà còn mang trong mình những giá trị phong thủy sâu sắc. Cá Koi tượng trưng cho sự bền bỉ, may mắn và sự phát triển trong cuộc sống. Mỗi giống cá Koi đều có ý nghĩa riêng, phản ánh những khát vọng và mong ước của con người, làm cho chúng trở thành lựa chọn phổ biến trong việc trang trí cảnh quan và tạo không gian thư giãn. Sự cuốn hút của cá Koi không chỉ nằm ở hình thức mà còn ở những giá trị tinh thần mà chúng mang lại.',
      author: 'Koi Quang Minh',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4b9v7aEUi9OICVrd9kCn3c6XTtYjrq9eRnA&s',
    },
    {
      id: '2',
      title: 'Ý nghĩa của việc nuôi cá koi theo chuyên gia phong thủy',
      date: 'Mon 25, 2020',
      description: 'Cá Koi từ lâu đã được coi là biểu tượng may mắn, thịnh vượng và trường thọ trong văn hóa phương Đông, tượng trưng cho sự kiên trì và sức mạnh. Truyền thuyết kể rằng khi cá Koi vượt thác thành công, nó sẽ hóa thành rồng - biểu tượng cao quý trong văn hóa Á Đông, thể hiện sự nỗ lực và khát vọng vượt khó. Mỗi màu sắc cá Koi mang ý nghĩa phong thủy riêng: cá Koi đỏ tượng trưng cho tình yêu, cá Koi vàng cho tài lộc, và cá Koi trắng cho bình an. Trong phong thủy, dòng nước trong bể cá Koi tượng trưng cho dòng chảy của tài lộc và sức khỏe. Ngày nay, cá Koi không chỉ là thú vui tao nhã mà còn được nuôi để thu hút may mắn và tài lộc, trở thành một phần trong đời sống của nhiều gia đình Á Đông và thế giới.',
      author: 'Koi Quang Nhật',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyiawRQexXqYeSMuhcUclHPe6hniwgRGONJQ&s',
    },
    {
      id: '3',
      title: 'Các loại cá koi nổi bật và ý nghĩa của chúng',
      date: 'Thu 25, 2020',
      description: 'Cá koi, biểu tượng của sự bền bỉ và may mắn, là một trong những loài cá cảnh được ưa chuộng nhất. Có nhiều giống cá koi khác nhau, mỗi loại mang ý nghĩa phong thủy riêng: Cá koi màu trắng với các vết đỏ. Đại diện cho sự thuần khiết và sự đổi mới. Cá koi có nền trắng với các vết đỏ và đen. Biểu trưng cho sự kiên cường và sự phát triển. Cá koi đen với các vết trắng, mang ý nghĩa về sự cân bằng và hòa hợp. Cá koi có nền đen với các vết đỏ và trắng, tượng trưng cho sức mạnh và quyền lực. Cá koi với màu xanh lam và đỏ. Đại diện cho sự bình an và hạnh phúc. Các giống cá koi này không chỉ đẹp mắt mà còn mang lại ý nghĩa tốt lành cho những ai sở hữu chúng.',
      author: 'Koi Quang Trinh',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXecE-soHFxZGxjBjo_BFSr_JjbSwGb5j_w&s',
    },
    {
      id: '4',
      title: 'Làm thế nào để chăm sóc cá koi đúng cách?',
      date: 'Sat 25, 2020',
      description: 'Hướng dẫn chi tiết cách chăm sóc và nuôi dưỡng cá koi tại nhà: Lựa chọn bể có kích thước phù hợp với số lượng cá. Nên có hệ thống lọc nước để giữ nước sạch. Kiểm tra chất lượng nước thường xuyên. Đảm bảo pH từ 6.5 đến 7.5 và thay nước định kỳ. Cung cấp thức ăn chuyên dụng cho cá koi, tránh cho ăn quá nhiều để không làm ô nhiễm nước. Giữ nhiệt độ nước ổn định, khoảng 18-24°C, để cá phát triển khỏe mạnh. Theo dõi tình trạng sức khỏe của cá, phát hiện sớm dấu hiệu bệnh tật và điều trị kịp thời.',
      author: 'Koi Gia Minh',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPSdAmbaGwgAT8-1UR_WNBFh3jAuKdxfCLgw&s',
    },
    {
      id: '5',
      title: 'Mẹo nuôi cá koi cho người mới bắt đầu',
      date: 'Sun 25, 2020',
      description: 'Những lưu ý quan trọng cho người mới bắt đầu nuôi cá Koi: Đảm bảo có hệ thống lọc tốt. Duy trì pH từ 6.5 đến 7.5. Sử dụng thức ăn chuyên dụng và không cho ăn quá nhiều. Khoảng 18-24°C. Phát hiện sớm dấu hiệu bệnh. Tránh nuôi quá đông. Đặt đá hoặc cây cỏ trong bể. Những lưu ý này sẽ giúp bạn nuôi cá koi thành công!',
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