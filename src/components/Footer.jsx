import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.companyName}>Công ty TNHH ON PLAZA VIỆT PHÁP - onkoi.vn</Text>
      <Text style={styles.subtitle}>Website Đang Chạy Thử Nghiệm Và Chờ Cấp Phép Của BVH - BTTT</Text>
      <Text style={styles.copyright}>Copyright © 2018 - All Rights Reserved.</Text>
      <Text style={styles.responsibility}>Chịu Trách Nhiệm về kiểm duyệt nội dung CEO - Chuyên gia cá koi Đào Văn Quang</Text>
      <Text style={styles.seo}>SEO by VCTSEO</Text>

      <View style={styles.divider}></View>

      <Text style={styles.keywords}>Từ khóa tìm kiếm nhiều: đấu giá cá koi | cá koi đẹp | cá koi nhật | thanh lý cá koi</Text>
      <Text style={styles.shipping}>Giao hàng miễn phí đến: Tp. Hà Nội, Tp. Hồ Chí Minh, Tp. Hải Phòng, Tp. Đà Nẵng, Tp. Cần Thơ, Hải Giang...</Text>

      <Text style={styles.address}>Địa chỉ văn phòng: Tầng 1, số nhà 59, ngõ 508, đường Láng</Text>
      <Text style={styles.office}>tổ 9B, phường Láng Hạ, quận Đống Đa, Hà Nội, Đông Đa 100000, Việt Nam</Text>
      
      <Text style={styles.contact}>SĐT: 024 6684 8743</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#470101', // Similar background color
    padding: 15,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  responsibility: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  seo: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  divider: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  keywords: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  shipping: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  office: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  contact: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  }
});
