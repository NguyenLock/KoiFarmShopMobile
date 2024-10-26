import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';

export default function Aboutus() {
  return (
    <ScrollView style={styles.container}>
      {/* Phần Banner */}
      <View style={styles.bannerContainer}>
        <Image 
          source={require('../../assets/logo-ca-koi.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Koi Japan-VN</Text>
        <Text style={styles.subtitle}>Chia sẻ vẻ đẹp của thiên nhiên</Text>
      </View>

      {/* Phần Giới thiệu câu chuyện */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Câu chuyện của chúng tôi</Text>
        <Text style={styles.text}>
          Được thành lập vào năm 2020, CaKoi Farm bắt đầu từ niềm đam mê với những 
          chú cá Koi xinh đẹp. Chúng tôi khởi đầu với một trại nhỏ và tình yêu to lớn 
          dành cho loài cá Nhật Bản này, và hôm nay, chúng tôi tự hào là nơi cung cấp 
          cá Koi chất lượng cao cho khách hàng khắp nơi.
        </Text>
      </View>

      {/* Phần Sứ mệnh */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sứ mệnh của chúng tôi</Text>
        <Text style={styles.text}>
          Sứ mệnh của CaKoi Farm là mang lại niềm vui và sự thư giãn cho mọi người 
          thông qua vẻ đẹp của cá Koi. Chúng tôi cam kết cung cấp những chú cá khỏe mạnh, 
          sinh động và dịch vụ tư vấn tận tình cho khách hàng.
        </Text>
      </View>

      {/* Phần Giá trị */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Giá trị của chúng tôi</Text>
        <View style={styles.valueItem}>
          <Text style={styles.valueTitle}>Chất lượng</Text>
          <Text style={styles.text}>
            Chúng tôi chọn lọc kỹ càng từng chú cá để đảm bảo sức khỏe và vẻ đẹp tuyệt vời.
          </Text>
        </View>
        <View style={styles.valueItem}>
          <Text style={styles.valueTitle}>Chuyên nghiệp</Text>
          <Text style={styles.text}>
            Đội ngũ của chúng tôi có kiến thức chuyên sâu và sẵn sàng tư vấn mọi lúc.
          </Text>
        </View>
        <View style={styles.valueItem}>
          <Text style={styles.valueTitle}>Khách hàng là ưu tiên</Text>
          <Text style={styles.text}>
            Chúng tôi đặt sự hài lòng của khách hàng lên hàng đầu và luôn đồng hành cùng bạn.
          </Text>
        </View>
      </View>

      {/* Thông tin liên hệ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ghé thăm chúng tôi</Text>
        <Text style={styles.contactText}>Địa chỉ: 123 Trại Cá Koi, Quận 9, TP. HCM</Text>
        <Text style={styles.contactText}>Điện thoại: (84) 123-456-789</Text>
        <Text style={styles.contactText}>Email: info@cakoi.com</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 CaKoi Farm. Mọi quyền được bảo lưu.</Text>
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
