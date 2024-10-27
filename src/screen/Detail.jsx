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

export default function Detail({ route, navigation }) {
  const { koi } = route.params;
  const { currentUser, comments, saveComment, toggleCart, cart } =
    useContext(CartContext);
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasCommented, setHasCommented] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState(0);

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

  const totalRating = combinedReviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = combinedReviews.length
    ? (totalRating / combinedReviews.length).toFixed(1)
    : 0;

  const handleAddToCart = () => {
    toggleCart(koi);
    Alert.alert("Added to Cart", `${koi.name} has been added to your cart.`);
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      navigation.navigate("Login");
      return;
    }
    toggleCart(koi);
    navigation.navigate("Checkout");
  };

  const filteredReviews = selectedRatingFilter
    ? combinedReviews.filter((review) => review.rating === selectedRatingFilter)
    : combinedReviews;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: koi.image }} style={styles.mainImage} />

        <View style={styles.headerContainer}>
          <Text style={styles.title}>{koi.name}</Text>
          <Text style={styles.price}>${koi.price}</Text>
        </View>

        <View style={styles.ratingContainer}>
          {renderStars(averageRating)}
          <Text style={styles.ratingText}>
            {averageRating} ({combinedReviews.length} reviews)
          </Text>
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
            <TouchableOpacity
              key={index}
              onPress={() => openImageModal(imageUri)}
            >
              <Image
                source={{ uri: imageUri }}
                style={styles.additionalImage}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Your Comments</Text>
        {!currentUser ? (
          <Text style={styles.loginPrompt}>
            Please log in to leave a comment.
          </Text>
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
                <TouchableOpacity
                  key={star}
                  onPress={() => setUserRating(star)}
                >
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

        <Text style={styles.sectionTitle}>View by rating</Text>
        <View style={styles.filterButtonsContainer}>
          {[0, 5, 4, 3, 2, 1].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.filterButton,
                selectedRatingFilter === rating && styles.selectedFilterButton,
              ]}
              onPress={() => setSelectedRatingFilter(rating)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedRatingFilter === rating &&
                    styles.selectedFilterButtonText,
                ]}
              >
                {rating === 0
                  ? "All"
                  : `${rating} Star${rating > 1 ? "s" : ""}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Reviews</Text>
        {filteredReviews.length === 0 ? (
          <Text style={styles.noReviewsText}>
            No reviews available for this rating.
          </Text>
        ) : (
          filteredReviews.map((review, index) => (
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

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={24} color="white" />
          <Text style={styles.footerButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.footerButtonText}>Buy Now</Text>
          <Text style={styles.footerPriceText}>${koi.price}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    padding: 15,
  },
  mainImage: {
    width: "100%",
    height: 500,
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
  ratingText: {
    marginLeft: 10,
    paddingTop: 10,
    fontSize: 16,
    color: "#555",
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
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  ratingInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  filterButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
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
    fontStyle: "italic",
    textAlign: "center",
    color: "gray",
    marginVertical: 10,
    marginBottom: 30,
  },
  reviewContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 18,
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#470101",
    padding: 10,
    borderRadius: 5,
  },
  buyNowButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  footerButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "bold",
  },
  footerPriceText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});
