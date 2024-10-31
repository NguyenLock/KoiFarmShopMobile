import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Notice", "Please fill out all required fields!");
    } else {
      Alert.alert("Thanks you!", "We will contact you shortly.");
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/5a/9d/f1/5a9df1d261390348172ed12213c18fd4.png",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Contact Us</Text>
              <TextInput
                style={styles.input}
                placeholder="FullName"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Your Message"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(249, 250, 253, 0.8)",
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#470101",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
    paddingVertical: 10,
  },
  background: {
    flex: 1,
  },
  button: {
    backgroundColor: "#470101",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 15,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
