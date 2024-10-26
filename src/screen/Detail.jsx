import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Detail({ route }) {
  const { koi } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);

  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color="gold"
        />
      );
    }
    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  const filteredReviews = selectedRating
    ? koi.reviews.filter((review) => review.rating === selectedRating)
    : koi.reviews;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: koi.image }} style={styles.mainImage} />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{koi.name}</Text>
        <Text style={styles.price}>${koi.price}</Text>
      </View>

      <View style={styles.ratingContainer}>
        {renderStars(koi.rating)}
        <Text style={styles.breed}>{koi.breed}</Text>
      </View>

      <Text style={styles.description}>{koi.description}</Text>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Product Info</Text>
        {Object.entries({
          Breed: koi.breed,
          Gender: koi.gender,
          Age: koi.age,
          Personality: koi.personality,
          Size: koi.size,
          "Feeding Amount": koi.feedingAmount,
          "Health Status": koi.healthStatus,
          "Award Certificate": koi.awardCertificate ? "Yes" : "No",
        }).map(([title, text], index) => (
          <View key={index} style={styles.infoContainer}>
            <Text style={styles.infoTitle}>{title}:</Text>
            <Text style={styles.infoText}>{text}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Additional Images</Text>
      <FlatList
        horizontal
        data={koi.additionalImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImageModal(item)}>
            <Image source={{ uri: item }} style={styles.additionalImage} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.additionalImagesContainer}
      />

      <Text style={styles.sectionTitle}>Customer Reviews</Text>
      <Text style={styles.reviewCount}>
        {filteredReviews.length}{" "}
        {filteredReviews.length === 1 ? "Review" : "Reviews"}
      </Text>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Rating:</Text>
        <View style={styles.filterButtons}>
          {[0, 5, 4, 3, 2, 1].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.filterButton,
                selectedRating === rating && styles.selectedFilterButton,
              ]}
              onPress={() => setSelectedRating(rating)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedRating === rating && styles.selectedFilterButtonText,
                ]}
              >
                {rating === 0
                  ? "All"
                  : `${rating} Star${rating > 1 ? "s" : ""}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {filteredReviews.length === 0 ? (
        <Text style={styles.noReviewsText}>No reviews available</Text>
      ) : (
        filteredReviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            {renderStars(review.rating)}
            <Text style={styles.reviewText}>{review.feedback}</Text>
            <Text style={styles.reviewAuthor}>
              - {review.username}, {review.feedbackDate}
            </Text>
          </View>
        ))
      )}

      {/* Modal to view full image */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  mainImage: {
    width: "100%",
    height: 550,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flexShrink: 1,
  },
  price: {
    fontSize: 22,
    color: "green",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    color: "black",
    marginLeft: 5,
  },
  breed: {
    paddingLeft: 10,
    paddingTop: 6,
    fontSize: 16,
    color: "gray",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  infoSection: {
    marginVertical: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoTitle: {
    fontWeight: "bold",
    marginRight: 5,
    width: 120,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
  additionalImagesContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  additionalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  reviewCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  filterButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#e4e4e4",
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedFilterButton: {
    backgroundColor: "gray",
  },
  filterButtonText: {
    color: "#000",
  },
  selectedFilterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noReviewsText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
    padding: 20,
  },
  reviewContainer: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  reviewAuthor: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
    fontStyle: "italic",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
  },
});
