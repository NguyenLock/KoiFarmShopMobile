import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
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
    const existingComment = comments.find(
      (c) => c.productId === koi.id && c.userId === currentUser.id
    );
    setHasCommented(!!existingComment); 
  }, [comments, koi.id, currentUser.id]);

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
      Alert.alert("You Have Comment this Produce.");
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
    Alert.alert("Comment Successfully!");
  };

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
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  const filteredReviews = koi.reviews.concat(
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

      <Text style={styles.sectionTitle}>Bình luận của bạn</Text>
      {hasCommented ? (
        <Text style={styles.alreadyCommented}>
          Bạn đã bình luận sản phẩm này.
        </Text>
      ) : (
        <View style={styles.commentBox}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write Comment Here (Exceeds 40 Symbols)..."
            maxLength={40}
            value={userComment}
            onChangeText={setUserComment}
          />
          <View style={styles.ratingInputContainer}>
            <Text>Đánh giá của bạn:</Text>
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

      <Text style={styles.sectionTitle}>Comment From Customers</Text>
      <FlatList
        data={filteredReviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewContainer}>
            {renderStars(item.rating)}
            <Text style={styles.reviewText}>{item.comment || item.feedback}</Text>
            <Text style={styles.reviewAuthor}>
              - {item.username}, {item.date || item.feedbackDate}
            </Text>
          </View>
        )}
      />

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
  ratingInputContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  alreadyCommented: {
    color: "gray",
    fontStyle: "italic",
    marginVertical: 10,
  },
  reviewContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  reviewText: {
    marginTop: 5,
  },
  reviewAuthor: {
    fontSize: 12,
    color: "gray",
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
