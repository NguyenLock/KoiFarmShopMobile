import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../contexts/CartContext";

export default function Detail({ route }) {
  const { koi } = route.params;
  const { currentUser, comments, saveComment } = useContext(CartContext);
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasCommented, setHasCommented] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const existingComment = comments.find(
        (c) => c.productId === koi.id && c.userId === currentUser.id
      );
      setHasCommented(!!existingComment);
    }
  }, [comments, koi.id, currentUser]);

  const handleCommentSubmit = () => {
    if (userComment.length === 0 || userRating === 0) {
      Alert.alert("Please enter ratings and comments.");
      return;
    }
    if (userComment.length > 40) {
      Alert.alert("Comments must not exceed 40 characters.");
      return;
    }
    if (hasCommented) {
      Alert.alert("You have already commented on this product.");
      return;
    }

    const newComment = {
      productId: koi.id,
      userId: currentUser.id,
      username: currentUser.username,
      comment: userComment,
      rating: userRating,
      date: new Date().toLocaleDateString(),
    };

    saveComment(newComment);
    setHasCommented(true);
    Alert.alert("Comment submitted successfully!");
  };

  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const renderStars = (rating) => {
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name={i < rating ? "star" : "star-outline"}
            size={16}
            color="gold"
          />
        ))}
      </View>
    );
  };

  const combinedReviews = koi.reviews.concat(
    comments.filter((comment) => comment.productId === koi.id)
  );

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
      <ScrollView horizontal style={styles.additionalImagesContainer}>
        {koi.additionalImages.map((imageUri, index) => (
          <TouchableOpacity key={index} onPress={() => openImageModal(imageUri)}>
            <Image source={{ uri: imageUri }} style={styles.additionalImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Your Comments</Text>
      {!currentUser ? (
        <Text style={styles.loginPrompt}>Please log in to leave a comment.</Text>
      ) : hasCommented ? (
        <Text style={styles.alreadyCommented}>
          You have already commented on this product.
        </Text>
      ) : (
        <View style={styles.commentBox}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write Comment Here (Max 40 Characters)..."
            maxLength={40}
            value={userComment}
            onChangeText={setUserComment}
          />
          <View style={styles.ratingInputContainer}>
            <Text>Your Rating:</Text>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                <Ionicons
                  name={star <= userRating ? "star" : "star-outline"}
                  size={20}
                  color="gold"
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCommentSubmit}
          >
            <Text style={styles.submitButtonText}>Send Comment</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.sectionTitle}>Comments From Customers</Text>
      {combinedReviews.length === 0 ? (
        <Text style={styles.noReviewsText}>
          Become the First Customer Reviews
        </Text>
      ) : (
        combinedReviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            {renderStars(review.rating)}
            <Text style={styles.reviewText}>
              {review.comment || review.feedback}
            </Text>
            <Text style={styles.reviewAuthor}>
              - {review.username}, {review.date || review.feedbackDate}
            </Text>
          </View>
        ))
      )}

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
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 22,
    color: "green",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  description: {
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
    marginVertical: 10,
  },
  additionalImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  commentBox: {
    marginVertical: 15,
  },
  commentInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#470101",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  submitButtonText:{
    color: "#fff",
    fontWeight:'bold'
  },
  ratingInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  noReviewsText: {
    fontStyle: "italic",
    textAlign: "center",
    color: "gray",
    marginVertical: 10,
    marginBottom:30
  },
  reviewContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
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
  },
});
